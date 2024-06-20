const puppeteer = require('puppeteer');

export async function getPopupSettings(browserName, browserVersion) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Implement logic to detect popup settings based on the browser
  let popupSettings;
  if (browserName === 'Chrome') {
    await page.goto('chrome://settings/content/popups');
    popupSettings = await page.evaluate(() => {
      return {
        allowed: document.querySelector('#allow-sites-to-show-popups').checked,
        blockedSites: Array.from(document.querySelectorAll('#popups-blocked-list li')).map(li => li.textContent),
      };
    });
  } else if (browserName === 'Firefox') {
    await page.goto('about:preferences#privacy');
    popupSettings = await page.evaluate(() => {
      return {
        allowed: document.querySelector('#popup-exceptions-as-allow-list').checked,
        blockedSites: Array.from(document.querySelectorAll('#popup-exceptions-list li')).map(li => li.textContent),
      };
    });
  }

  await browser.close();
  return popupSettings;
}

export async function requestPopupPermission(browserName, browserVersion) {
  // Implement logic to request popup permission based on the browser
  if (browserName === 'Chrome') {
    // Redirect the user to the Chrome popup settings page
    return 'https://chrome://settings/content/popups';
  } else if (browserName === 'Firefox') {
    // Redirect the user to the Firefox popup settings page
    return 'about:preferences#privacy';
  }
}