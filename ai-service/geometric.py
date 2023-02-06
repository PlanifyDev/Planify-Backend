from typing import Iterable

import cv2
import numpy as np
from pandas import Series
from shapely import Polygon, MultiPolygon


def get_mask(poly, shape=None, centerize=False):
    """ Return image conains multiploygon as a numpy array mask

    Params:
    -------
    poly: Polygon or MultiPolygon or Iterable[Polygon or MultiPolygon]
        The Polygon/s to get mask for
    shape: tuple
        The shape of the canvas to draw polygon/s on
    centerize

    Returns
    -------
    ndarray
        Mask array of the input polygon/s
    """

    if shape is None:
        if isinstance(poly, Polygon):
            x1, y1, x2, y2 = poly.bounds
            shape = (int(y2 - y1), int(x2 - x1))

    img = np.zeros(shape, dtype=np.uint8)

    if isinstance(poly, Polygon):
        img = cv2.drawContours(img, np.int32([poly.exterior.coords]), -1, 255, -1)

    elif isinstance(poly, MultiPolygon):
        for p in poly.geoms:
            img = cv2.drawContours(img, np.int32([p.exterior.coords]), -1, 255, -1)

    elif isinstance(poly, Series):
        polys = [p for p in poly.tolist() if p]
        img = get_mask(polys, shape)

    elif isinstance(poly, Iterable):
        for p in poly:
            img = (img != 0) | (get_mask(p, shape) != 0)
        img = img.astype(np.uint8) * 255

    return img.astype(np.uint8)
