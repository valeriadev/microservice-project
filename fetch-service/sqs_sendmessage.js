const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1",
  accessKeyId:process.env.accessKeyId,
  secretAccessKey:process.env.secretAccessKey
});
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports = {
  sendMessage: function(msg) {
    var params = {
      MessageBody: JSON.stringify(msg),
      QueueUrl: process.env.sqs_url
    };

    sqs.sendMessage(params, function(err, data) {
      if (err) {
        console.log("Error", err);
      }
    });
  }
};
