const express = require("express");
const puppeteer = require("puppeteer");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/automate", async (req, res) => {
  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();
    await page.goto("https://www.w3schools.com/html/html_forms.asp", {
      waitUntil: "networkidle2"
    });

    // Fill in fields on the demo form
    await page.type('input[name="firstname"]', "John");
    await page.type('input[name="lastname"]', "Doe");

    // Click the submit button (it just reloads the form in this demo)
    await page.click('input[type="submit"]');

    await browser.close();
    res.send("Demo site automated successfully.");
  } catch (err) {
    console.error(err);
    res.status(500).send("Automation failed.");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
