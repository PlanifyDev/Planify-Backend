import base64
import os
import boto3
import uuid

import cv2
import requests
from PIL import Image
import io


access_key = os.environ.get('AWS_ACCESS_KEY_ID')
secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
s3_reg = os.environ.get('AWS_S3_REGION')
bucket_name = os.environ.get('AWS_S3_BUCKET')
s3_url = os.environ.get('AWS_S3_ENDPOINT')
imgbb_key = os.environ.get('IMGBB_KEY')

print(access_key)

s3 = boto3.client('s3',
                  aws_access_key_id=access_key,
                  aws_secret_access_key=secret_key)


def upload_to_s3(mask, folder_name='projects'):
    random_id = str(uuid.uuid4())
    mask_image = Image.fromarray(mask)

    img_bytes = io.BytesIO()
    mask_image.save(img_bytes, format='PNG')
    img_bytes = img_bytes.getvalue()

    file_name = f'{folder_name}/{random_id}.png'
    content_type = "image/png"

    res = s3.put_object(Bucket=bucket_name, Key=file_name, Body=img_bytes, ContentType=content_type)
    status = res['ResponseMetadata']['HTTPStatusCode']
    if status == 200:
        # print( s3_url + '/' + bucket_name + '/' + file_name)
        return s3_url + '/' + bucket_name + '/' + file_name
    else:
        return None


def upload_to_imgbb(image):
    # rgb to bgr
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    _, buffer = cv2.imencode('.png', image)
    encoded_image = base64.b64encode(buffer).decode('utf-8')

    response = requests.post(
        "https://api.imgbb.com/1/upload",
        data={
            "image": encoded_image,
        },
        params={
            "key": imgbb_key,
        },
    )
    try:
        url = response.json()["data"]["url"]
        return url
    except Exception as e:
        print("Error uploading to imgbb", e)
        return None

