  'use strict';

let autoOpen = document.getElementById('autoOpen');

chrome.storage.local.get('autoOpen', function (data) {
  console.log(data.autoOpen);
  autoOpen.checked = data.autoOpen;
});

let textarea = document.getElementById('clipboard');
textarea.value = '';
textarea.select();

let clipboard = "";
if (document.execCommand('paste')) {
  clipboard = textarea.value.trim();
} else {
  console.error('Unable to get clipboard content');
}

textarea.addEventListener("keyup",clipboardChange);
function clipboardChange(data){
  clipboard = textarea.value;
  logic();
}
autoOpen.addEventListener("click", save);
function save() {
  if (autoOpen.checked)
    chrome.storage.local.set({ 'autoOpen': true }, function (data) {
    });
  else
    chrome.storage.local.set({ 'autoOpen': false }, function (data) {
    });
}
logic();

function logic(){
  chrome.storage.local.get("specs", function (config) {
    for (var specItem of config.specs) {
      //Evaluates func to memory
      this.eval(specItem.func);
      //Execute func to obtain URL to navigate
      let resultURL = func(clipboard, specItem.url, specItem.arrayOrPattern);
  
      if (resultURL) {
        if (resultURL.length > 300)
          return;
  
        document.getElementById("itemOne").innerHTML = "1. "+resultURL;
        break;
      }
      else
        document.getElementById("itemOne").innerHTML = "No Match";
    }
    return;
  });
}
