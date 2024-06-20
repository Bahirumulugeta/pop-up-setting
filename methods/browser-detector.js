// browser-detector.js
const bowser = require('bowser');

export function detectBrowser() {
  const browser = bowser.getParser(window.navigator.userAgent);
  return {
    name: browser.getBrowserName(),
    version: browser.getBrowserVersion(),
    os: browser.getOSName(),
  };
}