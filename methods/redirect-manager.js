const express = require('express');
const { detectBrowser, getPopupSettings, requestPopupPermission } = require('./index');

const app = express();

app.get('/popup-settings', async (req, res) => {
  try {
    const { name, version, os } = detectBrowser();
    const popupSettings = await getPopupSettings(name, version);

    if (!popupSettings.allowed) {
      const redirectUrl = await requestPopupPermission(name, version);
      return res.redirect(redirectUrl);
    }

    res.json(popupSettings);
  } catch (error) {
    console.error('Error managing popup settings:', error);
    res.status(500).json({ error: 'Error managing popup settings' });
  }
});

app.listen(3000, () => {
  console.log('Popup settings manager listening on port 3000');
});