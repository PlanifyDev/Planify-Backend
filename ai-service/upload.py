import os
import boto3
import uuid
from PIL import Image
import io
from flask.cli import load_dotenv

load_dotenv()
access_key = os.environ.get('AWS_ACCESS_KEY_ID')
secret_key = os.environ.get('AWS_SECRET_ACCESS_KEY')
s3_reg = os.environ.get('AWS_S3_REGION')
bucket_name = os.environ.get('AWS_S3_BUCKET')

s3_url = 'https://s3.' + s3_reg + '.amazonaws.com'


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
