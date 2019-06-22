// Read configuration from Default config file (config/config.json) 
// and store in local storage
'use strict';
chrome.runtime.onInstalled.addListener(function() {
  fetch("/config/config.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(configJson) {
    chrome.storage.local.set(configJson, function() {
    })
  });
});