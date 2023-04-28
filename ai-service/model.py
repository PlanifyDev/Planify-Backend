import torch
from joblib import load


def load_model(path, gpu=False):
    if gpu:
        model = torch.load(path).cuda().eval()
    else:
        model = torch.load(path, map_location=torch.device('cpu')).eval()
    return model


bed_model = load_model('models/beds.pth')
bed_b_model = load_model('models/beds2.pth')
bed_bath = load_model('models/bed_bath.pth')
draw_model = load_model('models/draw.pth')
rooms_number_model = load('models/area_number.joblib')
