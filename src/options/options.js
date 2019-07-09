'use strict';

//Read config from local storage
//This is setup in setup.js - by listening onInstalled listener
var eee = "",
    previousValue ="";

chrome.storage.local.get("specs", function (config) {
  require([
    'vs/basic-languages/monaco.contribution',
    'vs/language/json/monaco.contribution'
  ], function () {
    eee = monaco.editor.create(document.getElementById('container'), {
      value: [
        JSON.stringify(config),
      ].join('\n'),
      language: 'json'
    });
  });

  editorDidMount(eee, monaco);
  function editorDidMount(editor, monaco) {
    setTimeout(function () {triggerFormat()},300);
      previousValue=eee.getValue();
  }
  return;
});

function triggerFormat(){
    eee.trigger('anyString', 'editor.action.formatDocument');
}

document.getElementById("saveBtn").addEventListener("click", save);
function save(){
  chrome.storage.local.set(JSON.parse(eee.getValue()), function() {
    previousValue=eee.getValue();
    document.getElementById("saveStatus").setAttribute("style","visibility:visible;background: #d8f398;"); 
    setTimeout(function(){document.getElementById("saveStatus").setAttribute("style","visibility:hidden"); },3000);
  })
}

document.getElementById("resetBtn").addEventListener("click", reset);
function reset(){
    eee.setValue(previousValue);
    triggerFormat();
}