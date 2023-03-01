import { DB } from "../datastore";
import { cache } from "../cache";
import { myHandlerWithParam } from "../contracts/types";
import { UpdateImgParam, UpdateImgReq, UpdateImgRes } from "../contracts/api";
import { accessEnv } from "../helpers";
import AWS from "aws-sdk";
export const updateImageHandler: myHandlerWithParam<
  UpdateImgParam,
  UpdateImgReq,
  UpdateImgRes
> = async (req, res, next) => {
  const userId = res.locals.userId;
  AWS.config.update({
    accessKeyId: accessEnv("AWS_ACCESS_KEY"),
    secretAccessKey: accessEnv("AWS_SECRET_KEY"),
    region: "us-east-1",
  });

  const fileContent = Buffer.from(req.files.img["data"], "binary");

  const params = {
    Bucket: accessEnv("AWS_S3_BUCKET_NAME"),
    Key: userId,
    Body: fileContent,
    ContentType: req.files.img["mimetype"],
    ACL: "public-read",
  };

  const s3 = new AWS.S3();
  let image_url: string;

  const upload = s3.upload(params);
  upload
    .promise()
    .then((data) => {
      image_url = data.Location;
      return image_url;
    })
    // ------------ update image url in DB ------------
    .then(async (image_url) => {
      await DB.updateImg(userId, image_url).catch((error) => {
        throw Error(error);
      });
      return image_url;
    })
    // ------------ update image url in Cache ------------
    .then(async (image_url) => {
      await cache.updateImageCache(userId, image_url);
      return image_url;
    })
    .then((image_url) => {
      return res.status(200).send({ image_url });
    })
    .catch((err) => {
      return next(err);
    });
};
