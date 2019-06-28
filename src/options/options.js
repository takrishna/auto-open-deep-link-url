'use strict';

//Read config from local storage
//This is setup in setup.js - by listening onInstalled listener
var eee = "";
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
    setTimeout(function () {
      eee.trigger('anyString', 'editor.action.formatDocument');
    }, 300);
  }
  return;
});
