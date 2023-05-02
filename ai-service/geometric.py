from typing import Iterable

import cv2
import numpy as np
from pandas import Series
from shapely import Polygon, MultiPolygon, Point


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
