// Sniff content from clipboard

'use strict';
chrome.runtime.onInstalled.addListener(function() {
  console.log("Installed ");

  fetch("/config/config.json")
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    chrome.storage.local.set(myJson, function() {
      console.log('Config Set');
    })
  });
     //       .then(response => response.text())
       //     .then(text => sendResponse(text))
         //   .catch(error => ...)
  // chrome.storage.sync.set({color: "item"}, function() {
  //   console.log('color is ' + "item");
  // })

});