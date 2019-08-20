require("dotenv").config();
const Twitter = require("twitter");
const validateParams = require("./validateParams");
validateParams.validate();

const metric = require("../shared/metric");

const sqs = require("./sqs_sendmessage");

const client = new Twitter({
  consumer_key: process.env.consumer_key,
  consumer_secret: process.env.consumer_secret,
  access_token_key: process.env.access_token_key,
  access_token_secret: process.env.access_token_secret
});

client.stream("statuses/filter", { track: process.env.track }, function(
  stream
) {
  stream.on("data", function(tweet) {
    if (tweet.entities.urls.length > 0) {
      const { text, id, timestamp_ms } = tweet;

      const urls = [];

      for (let i = 0; i < tweet.entities.urls.length; i++) {
        urls.push(tweet.entities.urls[i].expanded_url);
      }

      const tweetData = {
        track: process.env.track,
        text,
        id,
        timestamp_ms,
        urls
      };

      sqs.sendMessage(tweetData);
      console.log(JSON.stringify(tweetData));

      metric.sendMetric("fetch-service", "Url", urls.length, [
        {
          Name: "track",
          Value: process.env.track
        }
      ]);
    }
  });

  stream.on("error", function(error) {
    console.error(error);
  });
});
