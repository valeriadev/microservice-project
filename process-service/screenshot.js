const puppeteer = require("puppeteer");

module.exports = {
  screenshot: async function screenshot(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const buffer = await page.screenshot();

    await browser.close();

    return buffer;
  }
};
