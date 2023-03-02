"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateImageHandler = void 0;
const datastore_1 = require("../datastore");
const helpers_1 = require("../helpers");
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const updateImageHandler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = res.locals.userId;
    aws_sdk_1.default.config.update({
        accessKeyId: (0, helpers_1.accessEnv)("AWS_ACCESS_KEY"),
        secretAccessKey: (0, helpers_1.accessEnv)("AWS_SECRET_KEY"),
        region: "us-east-1",
    });
    const fileContent = Buffer.from(req.files.img["data"], "binary");
    const params = {
        Bucket: (0, helpers_1.accessEnv)("AWS_S3_BUCKET_NAME"),
        Key: userId,
        Body: fileContent,
        ContentType: req.files.img["mimetype"],
        ACL: "public-read",
    };
    const s3 = new aws_sdk_1.default.S3();
    let image_url;
    const upload = s3.upload(params);
    upload
        .promise()
        .then((data) => {
        const image_url = data.Location;
        return image_url;
    })
        .then((image_url) => __awaiter(void 0, void 0, void 0, function* () {
        yield datastore_1.DB.updateImg(userId, image_url).catch((error) => {
            throw Error(error);
        });
        return image_url;
    }))
        .then((image_url) => {
        return res.status(200).send({ image_url });
    })
        .catch((err) => {
        return next(err);
    });
});
exports.updateImageHandler = updateImageHandler;
//# sourceMappingURL=updataImgHandler.js.map