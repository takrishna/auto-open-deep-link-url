// Sniff content from clipboard

'use strict';

chrome.tabs.onCreated.addListener(function (tab) {
  chrome.tabs.getSelected(null, function (tab) {
    //Skip logic if newtab
    if (tab.url != "chrome://newtab/")
      return;
    runBg(tab, fetchClipboard());
  });
});

//Fetch clipboard content
function fetchClipboard() {
  let textarea = document.getElementById('ta');
  textarea.value = '';
  textarea.select();

  if (document.execCommand('paste')) {
    return textarea.value.trim();
  }
  return "Unable to fetch from Clipboard";
}

//Executed in background
function runBg(tab, clipboard) {
  //Read config from local storage
  //This is setup in setup.js - by listening onInstalled listener
  chrome.storage.local.get(["specs", "autoOpen", "prevVisit"], function (config) {
    
    //Don't execute logic if Auto open flag is not set
    if (!config.autoOpen)
      return;

    for (var specItem of config.specs) {
      //Evaluates func to memory
      this.eval(specItem.func);
      //Execute func to obtain URL to navigate
      let resultURL = func(clipboard, specItem.url, specItem.arrayOrPattern);

      //If no result URL break
      if (!resultURL)
        continue;

      //Reject Bad URL
      if (resultURL.length > 300)
        continue;

      //run if not run on prev visit
      if (!(config.prevVisit && (config.prevVisit.prevOpenUrl.trim() == resultURL))) {
        chrome.tabs.update(tab.id, { url: resultURL });
        let prevVisit = { "prevVisit": { "prevOpenUrl": resultURL, "tabId": tab.id } };
        chrome.storage.local.set(prevVisit, function () {
        })
      }
      break;

    }
  });
}
//Handles previously opened URL scenario
chrome.tabs.onRemoved.addListener(function (tab) {
  chrome.storage.local.get('prevVisit', data => {
    if (data.prevVisit && (data.prevVisit.tabId == tab)) {
      chrome.storage.local.remove("prevVisit");
    }
  });
});
