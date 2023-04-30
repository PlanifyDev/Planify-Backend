import random

MIN_ROOM_AREA = 15.5
MAX_ROOM_AREA = 35
MIN_BROOM_AREA = 2.5
MAX_BROOM_AREA = 10


def rand_area(n, min_area, max_area):
    total = 0
    for i in range(n):
        midpoint = (min_area + max_area) / 2
        std_dev = (max_area - min_area) / 8
        room_area = random.normalvariate(midpoint, std_dev)
        room_area = max(min(room_area, max_area), min_area)
        total += round(room_area, 2)
    return total



def rand_bedroom_area(n):
    return rand_area(n, MIN_ROOM_AREA, MAX_ROOM_AREA)


def rand_bathroom_area(n):
    return rand_area(n, MIN_BROOM_AREA, MAX_BROOM_AREA)


def estimate_total_area(num_bedrooms, num_bathrooms):
    avg_ratio_1br_1ba = 0.6
    avg_ratio_2br_2ba = 0.7
    avg_ratio_3br_nba = 0.75
    combined_bed_bath_area = rand_bedroom_area(num_bedrooms) + rand_bathroom_area(num_bathrooms)
    if num_bedrooms == 1 and num_bathrooms == 1:
        area_ratio = avg_ratio_1br_1ba
    elif num_bedrooms == 2 and num_bathrooms == 2:
        area_ratio = avg_ratio_2br_2ba
    else:
        area_ratio = avg_ratio_3br_nba
    total_area = combined_bed_bath_area / area_ratio

    return total_area


def find_bed_bath_combo(target_area, max_bedrooms=10, max_bathrooms=10, max_area_exceed=0.1):
    closest_diff = float('inf')
    optimal_bedrooms = 0
    optimal_bathrooms = 0

    for num_bedrooms in range(1, max_bedrooms + 1):
        for num_bathrooms in range(1, max_bathrooms + 1):
            # Constraint 1: Bedroom to bathroom ratio
            if num_bedrooms / num_bathrooms > 3 or num_bedrooms / num_bathrooms < 1:
                continue

            current_area = estimate_total_area(num_bedrooms, num_bathrooms)
            current_diff = abs(target_area - current_area)

            # Constraint 2: Total area should not exceed the target area by more than 10%
            if current_area > target_area * (1 + max_area_exceed):
                continue

            if current_diff < closest_diff:
                closest_diff = current_diff
                optimal_bedrooms = num_bedrooms
                optimal_bathrooms = num_bathrooms

    return optimal_bedrooms, optimal_bathrooms

