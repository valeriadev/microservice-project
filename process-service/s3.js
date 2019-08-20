const AWS = require("aws-sdk");
const uuid = require("uuid");
const region = "eu-west-1";
AWS.config.update({
  region: region,
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey
});

const s3 = new AWS.S3();
const bucketName = "screenshot-images-8573";

module.exports = {
  putImage: async function putImage(image) {
    const imageUUID = uuid.v4();
    await s3.putObject({
      Bucket: bucketName,
      Key: imageUUID,
      Body: image,
      ACL: 'public-read'


    }).promise();

    return `https://${bucketName}.s3-${region}.amazonaws.com/${imageUUID}`;
  }
};
