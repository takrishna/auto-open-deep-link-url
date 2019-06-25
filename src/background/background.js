// Sniff content from clipboard

'use strict';

chrome.tabs.onCreated.addListener(function(tab) {   
  chrome.tabs.getSelected(null, function(tab){

    //todo - check if clipboard has changed and prevent further
    if(tab.url!="chrome://newtab/")
      return;

    let clipboard = null;
    let textarea = document.getElementById('ta');
    textarea.value = '';
    textarea.select();

    if (document.execCommand('paste')) {
      clipboard = textarea.value.trim();
    } else {
        console.error('Unable to get clipboard content');
    }

    //Read config from local storage
    //This is setup in setup.js - by listening onInstalled listener
    chrome.storage.local.get("specs", function(config) {
        for (var specItem of config.specs) {
          //Evaluates func to memory
          this.eval(specItem.func);
          //Execute func to obtain URL to navigate
          let resultURL = func(clipboard,specItem.url,specItem.arrayOrPattern);
          
          if (resultURL){
            if(resultURL.length > 300)
              return;

            chrome.tabs.update(tab.id, {url: resultURL});
            break;
          }
        }
        return;
    });
  });
});
