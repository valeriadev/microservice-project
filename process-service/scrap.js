const cheerio = require("cheerio");
const htmlToText = require("html-to-text");

module.exports = {
  scrap: function scrap(html) {
    const $ = cheerio.load(html);
    const text = htmlToText.fromString(html, {
      wordwrap: 512
    });

    return {
      title: $("title").text(),
      description: $('meta[property="description"]').attr("content") || $('meta[property="og:description"]').attr("content"),
      text,
      time: Date.now()
    };
  }
};
