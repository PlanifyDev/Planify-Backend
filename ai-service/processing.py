import cv2
import shapely
from shapely import Polygon
from shapely.affinity import scale, translate
import matplotlib.pyplot as plt
from geometric import get_mask


def process_data(data):
    inner = data.get('mask', [])
    print(data)
    # to shapely polygon
    poly = Polygon(inner)
    area = poly.area
    poly = scale(poly, 1, -1, 1)

    #################################################################
    # width = 512
    # fit_width = 490
    # scale to fit width
    # x1, y1, x2, y2 = poly.exterior.bounds
    # w, h = x2 - x1, y2 - y1
    # spower = max(w, h) / width
    # poly_scaled = scale(poly, spower, spower, 1, (x1, y1))
    # if w < h:
    #     poly_fit = translate(poly_scaled, -x1 + ((512-w)/2), -y1)
    # else:
    #     poly_fit = translate(poly_scaled, -x1, -y1 + ((512-h)/2))
    # poly_padded = scale(poly_fit, 1, 1, 1)
    # mask = get_mask(poly_padded, (width, width))
    # cv2.imwrite('mask.png', mask)
    ################################################################

    fig, axs = plt.subplots()
    axs.set_aspect('equal', 'datalim')

    axs.fill(*poly.exterior.xy, alpha=0.5, fc='r', ec='none')
    print(poly)
    plt.show()
    # process result

    return {
        'area': area,
        'inner': inner,
    }

