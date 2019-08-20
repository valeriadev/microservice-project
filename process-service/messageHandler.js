const sqs = require("./sqs_receivemessage");
const pageHandler = require("./pageHandler");
const scrapper = require("./scrap");
const screen = require("./screenshot");
const s3 = require("./s3");
const db = require("./db");
const metric = require("../shared/metric");

async function handleMessages() {
  while (true) {
    try {
      const messages = await sqs.getMessages();
      if (messages && messages.Messages) {
        for (let i = 0; i < messages.Messages.length; i++) {
          try {
            const msg = messages.Messages[i];
            const jsonMsg = JSON.parse(msg.Body);
            const pages = await getPages(jsonMsg);

            for (let i = 0; i < pages.length; i++) {
              const page = pages[i];

              const startScrap = Date.now();
              const dataAboutPage = scrapper.scrap(page);
              const endScrap = Date.now();
              metric.sendMetric("process-service", "time-scrap", endScrap-startScrap, []);

              dataAboutPage.track = jsonMsg.track;
              dataAboutPage.link = jsonMsg.urls[i];

              const startScreenshot = Date.now();
              const image = await screen.screenshot(dataAboutPage.link);
              const endScreenshot = Date.now();
              metric.sendMetric("process-service", "time-screenshot", endScreenshot-startScreenshot, []);


              const imageS3Url = await s3.putImage(image);
              dataAboutPage.s3ImageUrl = imageS3Url;

              db.item.create({
                title: dataAboutPage.title,
                description: dataAboutPage.description,
                link: dataAboutPage.link,
                content: dataAboutPage.text,
                timestamp: dataAboutPage.time,
                imageurl: dataAboutPage.s3ImageUrl,
                track:dataAboutPage.track,
              });
            }
            // upload to s3 -> save path in db ().
            // console.log(pages);
            sqs.deleteMessage(msg.ReceiptHandle);
          } catch (err) {
            console.error(
              `Failed to handle message from queue, Error: ${err.message}`
            );
          }
        }
      }
    } catch (e) {
      console.error(`Failed to fetch or delete from sqs, Error: ${e.message}`);
    }
  }
}

async function getPages(message) {
  const pages = [];
  if (message && message.urls) {
    for (let i = 0; i < message.urls.length; i++) {
      const url = message.urls[i];
      const page = await pageHandler.getPageByUrl(url);
      pages.push(page);
    }
  }

  return pages;
}

module.exports = {
  handleMessages
};
