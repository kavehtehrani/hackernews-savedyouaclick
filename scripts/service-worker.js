("use strict");

let bOpenTabsInBackground = true;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "open-in-background") {
    bOpenTabsInBackground = request.tabsInBackground;
    console.log(
      `Changing HNSavedYouAClick to open in background: ${bOpenTabsInBackground}`
    );
  } else if (request.message === "open-tab") {
    chrome.tabs.create({ url: request.url, active: !bOpenTabsInBackground });
  }

  return true;
});
