// Sniff content from clipboard

'use strict';

chrome.tabs.onCreated.addListener(function(tab) {   
  chrome.tabs.getSelected(null, function(tab){

    //todo have routine to check if clipboard has changed
    //and trigger auto load
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
    let config = {};
    chrome.storage.local.get("specs", function(data) {
        console.log('color is ', data);
        config = data;
        for (var specItem of data.specs) {
          this.eval(specItem.func);
          let result = func(clipboard,specItem.url,specItem.arrayOrPattern);
          
          //Check if weirdo and stop
          if(result.length > 300)
             return;

          if (result){
            chrome.tabs.update(tab.id, {url: result});
            break;
          }
        }
        return;
    });

    // ,
        // {
        //         "name":"if Gitlab SSH to to URL",
        //         "type":"pattern",
        //         "url":"{*}",
        //         "arrayOrPattern":"^ssh://git@gitlab.ing.net:2222",
        //         "func":"var func = function (clipboard,url,pattern){let re = new RegExp(pattern);if(re.test(clipboard)){return url.replace('{*}',clipboard);}else{return false;}}"
        // }   

    // if(result.length > 300)
    //   return;

    // if(isURL(result)){
    //   if (result.slice(0,3)=="www")
    //     chrome.tabs.update(tab.id, {url: "http://"+result});
    //   else
    //     chrome.tabs.update(tab.id, {url: result});
    //   return;
    // }
    
    
  });
});