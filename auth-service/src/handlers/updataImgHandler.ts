import { DB } from "../datastore";
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
      const image_url = data.Location;
      console.log("in first >>>>> ", image_url);

      return image_url;
    })
    .then(async (image_url) => {
      console.log("in second >>>>> ", image_url);

      await DB.updateImg(userId, image_url).catch((error) => {
        throw Error(error);
      });
      return image_url;
    })
    .then((image_url) => {
      console.log("in third >>>>> ", image_url);

      return res.status(200).send({ image_url });
    })
    .catch((err) => {
      return next(err);
    });
};
