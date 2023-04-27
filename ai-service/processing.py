import random
import time

import cv2
from geopandas import GeoSeries
from shapely import Polygon, Point, MultiPolygon
from shapely.affinity import scale, translate
import matplotlib.pyplot as plt
import numpy as np
from shapely.geometry import box

from geometric import get_mask
# from model import get_ai_pred
from upload import upload_to_s3


def fix_fit_poly(poly, size, pad=False):
    area = poly.area
    # poly = scale(poly, 1, -1, 1)
    #################################################################
    # scale to fit width
    # Get polygon bounding box
    minx, miny, maxx, maxy = poly.bounds
    bbox_width = maxx - minx
    bbox_height = maxy - miny

    aspect_ratio = bbox_width / bbox_height

    if aspect_ratio > size[0] / size[1]:
        new_width = size[0]
        new_height = size[0] / aspect_ratio
    else:
        new_width = size[1] * aspect_ratio
        new_height = size[1]

    scale_x = new_width / bbox_width
    scale_y = new_height / bbox_height

    # spower = width / max(w, h)
    poly_scaled = scale(poly, scale_y, scale_x, 1, (minx, miny))

    x1, y1, x2, y2 = poly_scaled.bounds
    w, h = x2 - x1, y2 - y1

    if pad:
        poly_fit = translate(poly_scaled, -x1 + ((size[0] - w) / 2), -y1 + ((size[1] - h) / 2))

    else:
        poly_fit = translate(poly_scaled, -x1, -y1)

    # poly_padded = scale(poly_fit, 1, 1, 1)
    #

    if isinstance(poly_fit, MultiPolygon):
        return max(poly_fit.geoms, key=lambda x: x.area), min(poly_fit.geoms, key=lambda x: x.area)

    return poly_fit, None


outex = cv2.imread("assets/outer1.jpg")
# outex = np.double(outex)
# outex = 2 * outex / 3
# outex = np.uint8(outex)

intex = cv2.imread("assets/inner1.jpg")

outex_icon = cv2.imread("assets/outer2.jpg")
intex_icon = cv2.imread("assets/inner2.jpg")

print(cv2.__version__)


def draw_display_picture(mask):
    mask = cv2.copyMakeBorder(mask.copy(), 64, 64, 64, 64, cv2.BORDER_CONSTANT)

    out = outex.copy()[:mask.shape[0], :mask.shape[1]]
    out[~np.logical_not(mask)] = 0

    inner = intex.copy()[:mask.shape[0], :mask.shape[1]]
    inner[np.logical_not(mask)] = 0

    mask_blur = cv2.GaussianBlur(mask, (500, 500), 100) - mask
    blur = cv2.merge((mask_blur, mask_blur, mask_blur))
    blur = cv2.bitwise_and(blur // 2, cv2.merge((mask, mask, mask)))
    blur[blur < 0] = 0
    final = (inner + out) - blur
    return final


def draw_display_picture_2(mask, icon=False, padding=64):
    mask = cv2.merge(3 * [mask])
    mask = cv2.copyMakeBorder(mask.copy(), padding, padding, padding, padding, cv2.BORDER_CONSTANT)

    if not icon:
        out = outex[:mask.shape[0], :mask.shape[1]].copy()
        inner = intex[:mask.shape[0], :mask.shape[1]].copy()
    else:
        out = outex_icon[:mask.shape[0], :mask.shape[1]].copy()
        inner = intex_icon[:mask.shape[0], :mask.shape[1]].copy()

    # out = out[:mask.shape[0], :mask.shape[1]]
    out[~np.logical_not(mask)] = 0

    if icon:
        mask_blur = cv2.GaussianBlur(mask, (101, 101), 10) & ~mask
    else:
        mask_blur = cv2.GaussianBlur(mask, (71, 71), 10) & ~mask
    out = out - (np.array([1, 1, 1]) * mask_blur) // 4

    # inner = inner[:mask.shape[0], :mask.shape[1]]
    inner[np.logical_not(mask)] = 0

    plt.imshow((inner + out)[:, :, ::-1])

    final = (out + inner)

    final[final < 0] = 0

    final = cv2.cvtColor(final.astype(np.uint8), cv2.COLOR_BGR2RGB)

    return final


def plot_poly(poly):
    plt.figure(figsize=(10, 10))
    fig, axs = plt.subplots()
    axs.set_aspect('equal', 'datalim')

    axs.fill(*poly.exterior.xy, alpha=0.5, fc='r', ec='none')
    plt.show()


def get_door_rect(door_point, inner):
    width = inner.area ** 0.5 * 0.06
    door = inner.exterior.intersection(door_point.buffer(width, join_style=2)).buffer(width / 3, join_style=2).bounds
    door_box = box(*door)
    door = door_box - door_box.intersection(inner)
    return door


def process_data(data):
    inner = data.get('mask', [])
    door = data.get('door_pos', [])

    poly = Polygon(inner)
    door = Point(door)

    door = get_door_rect(door, poly)

    GeoSeries([poly, door]).plot(cmap='Dark2_r', alpha=0.5, figsize=(10, 10))
    plt.show()

    compound_poly = MultiPolygon([poly, door])

    ai_width = (256, 256)
    disp_width = (1024, 1024)
    disp_icon_size = (480, 360)

    poly_disp, door_disp = fix_fit_poly(compound_poly, disp_width, pad=True)
    poly_ai, door_ai = fix_fit_poly(compound_poly, ai_width, pad=True)
    poly_disp_icon, door_disp_icon = fix_fit_poly(compound_poly, disp_icon_size, pad=True)

    disp_mask = get_mask(poly_disp, disp_width)
    disp_icon_mask = get_mask(poly_disp_icon, disp_icon_size)

    # TODO 1: Rooms and bathrooms from Area For AI mask
    # first objective
    # get suggested number of rooms and bathrooms from area
    area = data.get('area', 0)


    # TODO 5: Make 5 lines below a function
    # p = random_point_on_perimeter(poly_ai)
    scaled_ai_poly = scale(poly_ai, xfact=0.9, yfact=0.9, origin=(ai_width[0] / 2, ai_width[1] / 2))
    scaled_ai_door = scale(door_ai, xfact=0.9, yfact=0.9, origin=(ai_width[0] / 2, ai_width[1] / 2))

    ai_channel = get_mask(scaled_ai_poly, ai_width)
    door_channel = get_mask(scaled_ai_door, ai_width, 10)

    ai_mask_final = np.stack([np.zeros_like(ai_channel), ai_channel, door_channel], axis=-1)
    # save image

    # out = get_ai_pred(ai_mast_final, no_bedrooms, no_bathrooms)
    # cv2.imwrite("ai_mask.png", ai_mast_final)

    # plt.imshow(disp_mask)
    # plt.show()
    # plt.imshow(ai_mask)
    # plt.show()
    # return

    ################################################################

    cv2.imwrite('disp.png', ai_mask_final)

    # TODO 2: Upload all images to imgbb

    disp = draw_display_picture_2(disp_mask)
    disp_icon = draw_display_picture_2(disp_icon_mask, icon=True, padding=32)

    plt.imshow(disp)
    plt.show()

    plt.imshow(disp_icon)
    plt.show()

    mask_url = upload_to_s3(ai_mask_final, folder_name='masks')
    disp_url = upload_to_s3(disp, folder_name='projects')
    disp_icon_url = upload_to_s3(disp_icon, folder_name='projects_icon')

    return {
        **data,
        'area': area,
        'bedrooms': 0,
        'bathrooms': 0,
        'inner': inner,
        'project_img': disp_url,
        'project_icon': disp_icon_url,
        'mask_img': mask_url,
        'ai_output': None,
    }

# process_data({'mask': [[545, 120], [1315, 120], [1315, 645], [545, 645]]})
