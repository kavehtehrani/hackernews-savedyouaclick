// debugger;
("use strict");

let cbOpenTabsInBackGround = document.getElementById("open-tabs-in-background");

window.onload = async () => {
  try {
    const result = await chrome.storage.sync.get(["tabsInBackground"]);
    if ("tabsInBackground" in result) {
      cbOpenTabsInBackGround.checked = result.tabsInBackground;
    } else {
      cbOpenTabsInBackGround.checked = true;
    }
  } catch (err) {
    cbOpenTabsInBackGround.checked = true;
  }

  chrome.runtime.sendMessage({
    message: "open-in-background",
    tabsInBackground: cbOpenTabsInBackGround.checked,
  });
};

cbOpenTabsInBackGround.onchange = async () => {
  await chrome.storage.sync.set({
    tabsInBackground: cbOpenTabsInBackGround.checked,
  });

  chrome.runtime.sendMessage({
    message: "open-in-background",
    tabsInBackground: cbOpenTabsInBackGround.checked,
  });
};

document.getElementById("close-button").onclick = () => {
  window.close();
};
