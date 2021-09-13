'use strict';

//Listen to new Tab creation
chrome.tabs.onCreated.addListener(function (tab) {
  if (tab.pendingUrl !== "chrome://newtab/")
    return;
  chrome.storage.local.get(["specs", "autoOpen", "prevVisit"], function (config) {
    runInBackground(tab, fetchClipboard(), config, this);
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
function runInBackground(tab, clipboard, config, ref) {
  
  for (var specItem of config.specs) {
    //Evaluates func to memory
    let func = new Function("clipboard","url","arrayOrPattern", "buildRequestParam", "displayName",specItem.func);
    
    //Execute func to obtain URL to navigate
    let resultURL = func(clipboard, specItem.url, specItem.arrayOrPattern, specItem.displayName, specItem.buildRequestParam);

    //If no result URL continue to next item for a match
    if (!resultURL)
      continue;
    
    //Don't execute logic if Auto open flag is not set
    if (!config.autoOpen){
      setBadge("1");
      return;
    }

    //Reject Bad URL
    if (resultURL.length > 300)
      continue;

    //Run if not run on prev visit
    if (!(config.prevVisit && (config.prevVisit.prevOpenUrl.trim() == resultURL))) {
      chrome.tabs.update(tab.id, { url: resultURL.url });
      let prevVisit = { "prevVisit": { "prevOpenUrl": resultURL.url, "tabId": tab.id } };
      chrome.storage.local.set(prevVisit, function () {});
      setBadge("");
    } else { //Notify User if you have blocked a default behaviour
      setBadge("1");
    }
    break;
  }
}
//Set badge notification
function setBadge(text) {
  chrome.browserAction.setBadgeText({ "text": text, }, data => { });
}

//Handles previously opened URL scenario
chrome.tabs.onRemoved.addListener(function (tab) {
  chrome.storage.local.get('prevVisit', data => {
    if (data.prevVisit && (data.prevVisit.tabId == tab)) {
      chrome.storage.local.remove("prevVisit");
    }
  });
  // Clear badge notification
  setBadge("");
});
