const AWS = require("aws-sdk");
AWS.config.update({
  region: "eu-west-1",
  accessKeyId:process.env.accessKeyId,
  secretAccessKey:process.env.secretAccessKey
});
const watch = new AWS.CloudWatch();

module.exports = {
    sendMetric: function sendMetric(appName,metricName,value,dimArray=[]) {
        const params = {
            MetricData: [ 
              {
                MetricName: metricName, 

                Dimensions: dimArray,
                Timestamp: new Date(),
                Unit:"Count",
                Value: value,
              },
            ],
            Namespace: appName
          };
          watch.putMetricData(params, function(err, data) {
            if (err) console.error(err, err.stack); 
          });
    }
}