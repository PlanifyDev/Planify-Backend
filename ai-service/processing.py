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

    if not pad:
        if w < h:
            poly_fit = translate(poly_scaled, -x1 + ((512 - w) / 2), -y1)
        else:
            poly_fit = translate(poly_scaled, -x1, -y1 + ((512 - h) / 2))
    else:
        poly_fit = translate(poly_scaled, -x1, -y1)

    poly_padded = scale(poly_fit, 1, 1, 1)
    #
    return poly_padded, area


def draw_display_picture(mask):
    import time
    t = time.perf_counter()
    out = cv2.imread("outer.jpg")
    inner = cv2.imread("inner.jpg")
    mask = cv2.copyMakeBorder(mask.copy(), 64, 64, 64, 64, cv2.BORDER_CONSTANT)

    out = out[:mask.shape[0], :mask.shape[1]]
    out[~np.logical_not(mask)] = 0

    inner = inner[:mask.shape[0], :mask.shape[1]]
    inner[np.logical_not(mask)] = 0

    mask_blur = cv2.GaussianBlur(mask, (21, 21), 100) - mask
    blur = cv2.merge((mask_blur, mask_blur, mask_blur))
    blur = cv2.bitwise_and(blur // 4, cv2.merge((mask, mask, mask)))
    blur[blur < 0] = 0
    final = (inner + out) - blur
    return final


def plot_poly(poly):
    plt.figure(figsize=(10, 10))
    fig, axs = plt.subplots()
    axs.set_aspect('equal', 'datalim')

    axs.fill(*poly.exterior.xy, alpha=0.5, fc='r', ec='none')
    plt.show()


def process_data(data):
    inner = data.get('mask', [])
    poly = Polygon(inner)

    ai_width = 512
    disp_width = 1024

    poly_disp, area = fix_fit_poly(poly, disp_width, pad=True)
    poly_ai, area = fix_fit_poly(poly, ai_width)

    ai_mask = get_mask(poly_ai, (ai_width, ai_width))
    disp_mask = get_mask(poly_disp)

    # plt.imshow(disp_mask)
    # plt.show()
    # plt.imshow(ai_mask)
    # plt.show()
    ################################################################
    bucket = 'planify.s3'

    disp = draw_display_picture(disp_mask)
    # cv2.imwrite('disp.jpg', disp)
    # cv2.imwrite('disp_mask.png', disp_mask)
    # cv2.imwrite('ai_mask.png', ai_mask)

    mask_url = upload_to_s3(ai_mask, bucket, folder_name='masks')

    disp_rgb = cv2.cvtColor(disp, cv2.COLOR_BGR2RGB)
    disp_url = upload_to_s3(disp_rgb, bucket, folder_name='projects')

    return {
        **data,
        'area': area,
        # 'inner': inner,
        'project_img': disp_url,
        'mask_img': mask_url
    }
