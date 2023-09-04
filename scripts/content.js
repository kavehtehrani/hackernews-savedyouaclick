("use strict");

baseURL = "https://news.ycombinator.com/";

const entriesAll = document.getElementsByClassName("athing");

const openBackgroundTab = async (url) => {
  try {
    chrome.runtime.sendMessage({
      message: "open-tab",
      url: url,
    });
  } catch (err) {
    console.log(err);
  }
};

for (let entry of entriesAll) {
  let titleLink = entry
    .getElementsByClassName("titleline")[0]
    .getElementsByTagName("a")[0]
    .getAttribute("href");

  let commentLink = `https://news.ycombinator.com/item?id=${entry.getAttribute("id")}`;

  const btnImg = document.createElement("img");
  btnImg.src = chrome.runtime.getURL("icons/icon16.png");
  btnImg.classList.add("hnsaveaclickimg");

  const btnSaveAClick = document.createElement("button");
  btnSaveAClick.classList.add("hnsaveaclick");
  btnSaveAClick.appendChild(btnImg);

  btnSaveAClick.onclick = () => {
    try {
      // exclude pages such as ASK HN or Show HN
      if (!titleLink.includes("item?id")) {
        openBackgroundTab(titleLink);
      }

      openBackgroundTab(commentLink);
    } catch (err) {
      console.log(err);
    }
  };

  entry
    .getElementsByClassName("titleline")[0]
    .insertAdjacentElement("afterend", btnSaveAClick);
}
