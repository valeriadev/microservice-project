const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1",
  accessKeyId:process.env.accessKeyId,
  secretAccessKey:process.env.secretAccessKey
});
const sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

module.exports = {
  getMessages: async function() {

    const messages = await sqs.receiveMessage({
      QueueUrl:process.env.sqs_url,
    }).promise();

    return messages;
  },

  deleteMessage: function(msgId) {
    sqs.deleteMessage({
      QueueUrl:process.env.sqs_url,
      ReceiptHandle:msgId
    }).promise().catch((err)=>{
      console.error(`Failed to delete message from queue ${err.message}`)
    })
  }
};
