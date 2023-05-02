from matplotlib import pyplot as plt

from model import rooms_number_model
import torch
from typing import Iterable

import cv2
import numpy as np
from pandas import Series
from shapely.geometry import MultiPolygon, Polygon, Point, box
import matplotlib.pyplot as plt
from skimage.feature import blob_dog, blob_log, blob_doh
from skimage.color import rgb2gray
from skimage import io
from model import *


def get_mask(poly, shape=(256, 256), point_s=15, line_s=0):
    try:
        img = np.zeros(shape, dtype=np.uint8)
        if isinstance(poly, Polygon):
            if poly.is_empty:
                return img

            if line_s:
                points = np.array(poly.exterior.coords[:], dtype=np.int32)
                img = cv2.polylines(img, [points], True, (0, 255, 0), thickness=2)
            else:
                img = cv2.drawContours(img, np.int32([poly.exterior.coords]), -1, 255, -1)

        elif isinstance(poly, MultiPolygon):
            for p in poly.geoms:
                img = cv2.drawContours(img, np.int32([p.exterior.coords]), -1, 255, -1)

        elif isinstance(poly, Series):
            polys = [p for p in poly.tolist() if p]
            img = get_mask(polys, shape, point_s)

        elif isinstance(poly, Iterable):
            for p in poly:
                img = (img != 0) | (get_mask(p, shape, point_s) != 0)
            img = img.astype(np.uint8) * 255
        elif isinstance(poly, Point):
            p = poly.coords[0]
            img = cv2.circle(img, (int(p[0]), int(p[1])), point_s, 255, -1)
        return img.astype(np.uint8)
    except:
        return img


def get_rooms_number(area):
    bd, bt = rooms_number_model.predict([[area]])[0]
    return min(4, int(bd)), min(4, int(bt))


onehot = {}
for i in [1, 2, 3, 4]:
    for j in [1, 2, 3, 4]:
        img = np.zeros((256, 256, 8))
        img[:, :, i - 1] = np.ones((256, 256))
        img[:, :, j + 4 - 1] = 1
        onehot[(i, j)] = img[:, :, :]


def get_input(inner, door, bedn, bathn, channels=None, n=None, draw=False, aug=False, aug_bath=False, aug_draw=False):
    if channels is None:
        channels = []

    # img = cv2.imread(r"C:\Demon Home\Grad Project\ai-service\imgs/5.png")
    # img = np.array(img).astype(np.uint8)
    #
    # # rgb to bgr
    # img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)
    # cc = img[:, :, 0].copy()
    # img[:, :, 0] = img[:, :, 1]
    # img[:, :, 1] = cc

    # area = min(1, estimate_total_area(bedn, bathn) / 500) * 400 / 400
    #     area = torch.from_numpy(areas[int(area)]).view(-1, 256, 256)
    # area_input = torch.ones(1, 256, 256) * area

    d = np.zeros((256, 256, 3))

    d[:, :, 0] = door
    d[:, :, 1] = inner

    input_image = torch.from_numpy(d).permute(2, 0, 1) / 255

    n = len(channels) + 3 if not n else n

    if aug_draw:
        first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
        second = torch.from_numpy(channels[1]).view(1, 256, 256).bool().float()
        nu = onehot[(bedn, bathn)]
        input_image = torch.cat((input_image[[1, 0], :, :].bool().float(),
                                 torch.from_numpy(nu).permute(2, 0, 1).bool().float(), first, second), dim=0)
        return input_image
    if aug_bath:
        first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
        nu = onehot[(bedn, bathn)]
        input_image = torch.cat(
            (input_image[[1, 0], :, :].bool().float(), torch.from_numpy(nu).permute(2, 0, 1).bool().float(), first),
            dim=0)
        return input_image
    if aug:
        nu = onehot[(bedn, bathn)]
        input_image = torch.cat(
            (input_image[[1, 0], :, :].bool().float(), torch.from_numpy(nu).permute(2, 0, 1).bool().float()), dim=0)
        return input_image
    # if new_bath:
    #     first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
    #     input_image = torch.cat((input_image[[1, 0], :, :].bool().float(), area_input.float(), first.float()), dim=0)
    #     return input_image
    # if new:
    #     input_image = torch.cat((input_image[[1, 0], :, :].bool().float(), area_input.float()), dim=0)
    #     return input_image

    if draw:
        first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
        second = torch.from_numpy(channels[1]).view(1, 256, 256).bool().float()
        input_image = torch.cat((input_image[[1, 0], :, :].bool().float(), first.float(), second.float()), dim=0)
        return input_image

    d1 = []
    # if not skip_area:
    # d1 = [area_input.float()]
    if n == 4:
        first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
        data = d1 + [first.float()]
    elif n == 3:
        data = d1
    elif n == 5:
        first = torch.from_numpy(channels[0]).view(1, 256, 256).bool().float()
        second = torch.from_numpy(channels[1]).view(1, 256, 256).bool().float()
        data = d1 + [first.float(), second.float()]
    input_image = torch.cat((input_image[[1, 0], :, :].bool().float(), *data), dim=0)
    return input_image


def imfy(img):
    return (np.clip(img, 0, 1) * 255).astype(np.uint8)


def get_rects(imgr, centroids):
    bounds = get_mask(centroids, point_s=8).astype(np.uint8)
    img = (imgr).astype(np.uint8)
    #     img[bounds>0] = 0

    img[np.where(bounds == 0)] = 0
    # plt.imshow(img)
    # plt.show()

    shapes = []
    cnts = cv2.findContours(img, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    for i, c in enumerate(cnts[0]):
        M = cv2.moments(c)
        box = cv2.boundingRect(c);
        x1, y1, w, h = box
        x2, y2 = x1 + w, y1 + h

        ii = imgr[y1:y2, x1:x2]

        intensity = np.mean(ii)

        if not M["m00"]:
            continue
        cx = M["m10"] / M["m00"]
        cy = M["m01"] / M["m00"]
        shapes.append([cx, cy, intensity])

    return [Point(*i[:2]) for i in sorted(shapes, key=lambda x: x[2], reverse=True)]

def get_rects_2(channel, gcenters=True):
    a = channel.copy()

    a[a < 0.9] = 0
    a[a > 1] = 1

    a = (255 * a).astype(np.uint8)

    _, thresh = cv2.threshold(a, 0, 255, cv2.THRESH_OTSU)

    contours, _ = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    final_c = []
    centers = []
    for c in contours:
        perimeter = cv2.arcLength(c, True)
        approx = cv2.approxPolyDP(c, 0.01 * perimeter, True)
        x, y, w, h = cv2.boundingRect(approx)
        shapely_box = box(x, y, x + w, y + h)
        final_c.append(shapely_box.buffer(5, join_style=2, cap_style=2))

        mask = np.zeros((256, 256))
        mask = cv2.drawContours(mask, [c], -1, 255, -1)

        rms = channel.copy()
        rms[mask == 0] = 0

        M = cv2.moments(rms)
        cX = int(M["m10"] / M["m00"])
        cY = int(M["m01"] / M["m00"])
        centers.append(Point(cX, cY))

    if gcenters:
        return centers
    return MultiPolygon(final_c).buffer(0)


def get_design(door, inner, area):
    bedn, bathn = get_rooms_number(area)

    inner = inner > 0
    door = door > 0

    input_image = get_input(inner, door, bedn, bathn, aug=True)

    x = bed_model(input_image.reshape(1, 10, 256, 256))[0].permute(1, 2, 0).detach().numpy()
    im = imfy(x[:, :, 0])
    img = cv2.GaussianBlur(im, (15, 15), 5)
    blobs_log = blob_log(img, min_sigma=12, max_sigma=30, threshold=0.07)
    bed_centroids = [Point(i[1], i[0]) for i in blobs_log]
    bed_centroids = get_rects(im, bed_centroids)[0]
    bed_centroids_in = get_mask(bed_centroids, point_s=8)

    # plt.imshow(x)
    # plt.show()
    # plt.imshow(bed_centroids_in)
    # plt.show()
    input_image = get_input(inner, door, bedn, bathn, channels=[bed_centroids_in], aug_bath=True)
    x = bed_b_model(input_image.reshape(1, 11, 256, 256))[0].permute(1, 2, 0).detach().numpy()
    im = imfy(x[:, :, 0])
    img = cv2.GaussianBlur(im, (15, 15), 5)
    blobs_log = blob_log(img, min_sigma=12, max_sigma=30, threshold=0.01)
    bed_centroids = [Point(i[1], i[0]) for i in blobs_log]
    bed_centroids = get_rects(im, bed_centroids)[:bedn]
    bed_centroids_in = get_mask(bed_centroids, point_s=8)
    # plt.imshow(x)
    # plt.show()

    input_image = get_input(inner, door, bedn, bathn, channels=[bed_centroids_in], aug_bath=True)
    x = bed_bath(input_image.reshape(1, 11, 256, 256))[0].permute(1, 2, 0).detach().numpy()
    im = imfy(x[:, :, 0])
    img = cv2.GaussianBlur(im, (15, 15), 5)
    blobs_log = blob_log(img, min_sigma=12, max_sigma=30, threshold=0.01)
    bed_centroids = [Point(i[1], i[0]) for i in blobs_log][:bedn]
    bed_centroids_in = get_mask(bed_centroids, point_s=5)

    im = imfy(x[:, :, 1])
    img = cv2.GaussianBlur(im, (15, 15), 5)
    blobs_log = blob_log(img, min_sigma=10, max_sigma=15, threshold=0.01)
    bath_centroids = [Point(i[1], i[0]) for i in blobs_log]
    bath_centroids = get_rects(im, bath_centroids)[:bathn]
    bath_centroids_in = get_mask(bath_centroids, point_s=10)
    # plt.imshow(x)
    # plt.show()

    # plt.imshow( input_image.permute(1, 2, 0).detach().numpy()[:, :, 0] * 128 + input_image.permute(1, 2,
    # 0).detach().numpy()[:, :, 1] * 256 + get_mask(bed_centroids, point_s=2) + get_mask( bath_centroids, point_s=1))
    # plt.show()

    bed_centroids_in = get_mask(bed_centroids, point_s=8) > 0
    bath_centroids_in = get_mask(bath_centroids, point_s=5) > 0
    input_image = get_input(inner, door, bedn, bathn, channels=[bed_centroids_in, bath_centroids_in], aug_draw=1)
    x = draw_model(input_image.reshape(1, 12, 256, 256))
    max_channels = torch.max(x, dim=1)[1]

    x[:, 4] *= 3
    x[:, 0][max_channels != 0] = 0
    x[:, 1][max_channels != 1] = 0
    x[:, 2][max_channels != 2] = 0
    x[:, 3][max_channels != 3] = 0
    x[:, 4][max_channels != 4] = 0
    x[:, 2] += x[:, 3]
    x[:, 0] += x[:, 4]
    x[:, 1] += x[:, 4]
    x[:, 2] += x[:, 4]

    x = (x > 0.5).bool().float()
    x = x[0].permute(1, 2, 0).detach().numpy()
    # plt.imshow(x[:, :, :3])
    # plt.show()
    x[x<0] = 0
    x[x>1] = 1
    # plt.imshow(x[:, :, :3])
    # plt.show()
    return (x[:, :, :3] * 255).astype(np.uint8)


    img = x.copy()
    for _ in range(3):
        bed_rects = get_rects_2(img[:, :, 0])
        bath_rects = get_rects_2(img[:, :, 1])
        bed_centroids_in = get_mask([i for i in bed_rects], point_s=8) > 0
        bath_centroids_in = get_mask([i for i in bath_rects], point_s=5) > 0
        input_image = get_input(inner, door, bedn, bathn, channels=[bed_centroids_in, bath_centroids_in], aug_draw=1)
        img = draw_model(input_image.reshape(1, 12, 256, 256))

        max_channels = torch.max(img, dim=1)[1]
        img[:, 0][max_channels != 0] = 0
        img[:, 1][max_channels != 1] = 0
        img[:, 2][max_channels != 2] = 0
        img[img > 1] = 1
        img[img < 0] = 0
        img = img[0].permute(1, 2, 0).detach().numpy()


    bed_centroids_in = get_mask(bed_centroids, point_s=8) > 0
    bath_centroids_in = get_mask(bath_centroids, point_s=5) > 0
    input_image = get_input(inner, door, bedn, bathn, channels=[bed_centroids_in, bath_centroids_in], aug_draw=1)

    img = draw_model(input_image.reshape(1, 12, 256, 256))[0].permute(1, 2, 0).detach().numpy()

    bed_rects = get_rects_2(img[:, :, 0], 0)
    bath_rects = get_rects_2(img[:, :, 1], 0)

    bed_rects = bed_rects - bath_rects.buffer(2, join_style=2, cap_style=2)
    rr = 0.7 * get_mask(bed_rects) + 0.5 * get_mask(bath_rects) + 0.25 * input_image[1, :,: ].numpy() * 255+ 0.35 * input_image[0, :,: ].numpy() * 255

    plt.imshow(rr)
    plt.show()


