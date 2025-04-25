const express = require('express');
const puppeteer = require('puppeteer');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post('/automate', async (req, res) => {
  const { text } = req.body;

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    await page.goto('https://your-second-site.com');

    // Replace selectors with actual ones from your site
    await page.type('#textField', text || 'Default Text');
    await page.click('#generateButton');

    // Wait for the video to be generated
    await page.waitForSelector('video');

    // Optionally, click the upload button
    await page.click('#uploadButton');

    await browser.close();
    res.status(200).send('Automation completed successfully.');
  } catch (error) {
    console.error(error);
    res.status(500).send('Automation failed.');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
