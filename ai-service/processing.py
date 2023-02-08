import time

import cv2
from shapely import Polygon
from shapely.affinity import scale, translate
import matplotlib.pyplot as plt
import numpy as np
from geometric import get_mask
from upload import upload_to_s3


def fix_fit_poly(poly, width, pad=False):
    area = poly.area
    # poly = scale(poly, 1, -1, 1)
    #################################################################
    # scale to fit width
    x1, y1, x2, y2 = poly.exterior.bounds
    w, h = x2 - x1, y2 - y1
    spower = width / max(w, h)
    poly_scaled = scale(poly, spower, spower, 1, (x1, y1))

    x1, y1, x2, y2 = poly_scaled.exterior.bounds
    w, h = x2 - x1, y2 - y1

    if pad:
        if w < h:
            poly_fit = translate(poly_scaled, -x1 + ((width - w) / 2), -y1)
        else:
            poly_fit = translate(poly_scaled, -x1, -y1 + ((width - h) / 2))
    else:
        poly_fit = translate(poly_scaled, -x1, -y1)

    poly_padded = scale(poly_fit, 1, 1, 1)
    #
    return poly_padded, area


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
    return final


def plot_poly(poly):
    plt.figure(figsize=(10, 10))
    fig, axs = plt.subplots()
    axs.set_aspect('equal', 'datalim')

    axs.fill(*poly.exterior.xy, alpha=0.5, fc='r', ec='none')
    plt.show()


def process_data(data):
    # start = time.time()
    inner = data.get('mask', [])
    poly = Polygon(inner)

    ai_width = 512
    disp_width = 1024
    disp_icon_width = 480

    poly_disp, area = fix_fit_poly(poly, disp_width, pad=True)
    poly_ai, area = fix_fit_poly(poly, ai_width)
    poly_disp_icon, area = fix_fit_poly(poly, disp_icon_width, pad=True)

    ai_mask = get_mask(poly_ai, (ai_width, ai_width))
    disp_mask = get_mask(poly_disp, (disp_width, disp_width))
    disp_icon_mask = get_mask(poly_disp_icon, (disp_icon_width, disp_icon_width))

    # plt.imshow(disp_mask)
    # plt.show()
    # plt.imshow(ai_mask)
    # plt.show()
    ################################################################


    # cv2.imwrite('disp.jpg', disp)
    # cv2.imwrite('disp_mask.png', disp_mask)
    # cv2.imwrite('ai_mask.png', ai_mask)

    bucket = 'planify.s3'

    disp = draw_display_picture_2(disp_mask)
    disp_icon = draw_display_picture_2(disp_icon_mask, icon=True)

    disp[disp < 0] = 0
    disp_rgb = cv2.cvtColor(disp.astype(np.uint8), cv2.COLOR_BGR2RGB)

    disp_icon[disp_icon < 0] = 0
    disp_icon_rgb = cv2.cvtColor(disp_icon.astype(np.uint8), cv2.COLOR_BGR2RGB)

    # print(time.time() - start)
    mask_url = upload_to_s3(ai_mask,  folder_name='masks')
    disp_url = upload_to_s3(disp_rgb, folder_name='projects')
    disp_icon_url = upload_to_s3(disp_icon_rgb, folder_name='projects_icon')

    return {
        **data,
        'area': area,
        # 'inner': inner,
        'project_img': disp_url,
        'project_icon': disp_icon_url,
        'mask_img': mask_url
    }
