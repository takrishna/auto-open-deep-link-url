// Sniff content from clipboard

'use strict';
var list = [];

	var editor = monaco.editor.create(document.getElementById('container'), {
    value:[
      'var urlToOpenOnTheNewTab = function (clipboard, url, array){',
      ' if(array.findIndex(function(element){return clipboard==element})!=-1){',
      '   return url+clipboard;',
      ' }else{',
      '   return false;',
      ' }',
      '}'
    ].join('\n'),
		language: 'javascript'
  });
  
  var func = function (clipboard,url,array){if(array.findIndex(function(element){return clipboard==element})!=-1){return url+clipboard;}else{return false;}}


var arrayFunc = function test(clipboard,url,array){
  if(array.findIndex(function(element){return clipboard==element})!=-1){
      return url+clipboard;
    }else{
    return false;
  }
}
var patternItem = {
  name:"buildId",
  type:"pattern",
  url:"http://google.com/search?q=",
  patternRegEx:"",
  func:"var func = function (clipboard,url,array){if(array.findIndex(function(element){return clipboard==element})!=-1){return url+clipboard;}else{return false;}}"
}

var arrayItem = {
  name:"buildId",
  type:"array",
  url:"http://google.com/search?q=",
  array:["abi","anamika","preethi"],
  func:arrayFunc
}

var patternFunc = function (clipboard,url,patternRegEx){
  
}

var a = "function (clipboard,url,array){if(array.findIndex(function(element){return clipboard==element})!=-1){return url+clipboard;//http://google.com/search?q=hello;}else{return false;}};";

var ab = function (clipboard,url,array){
  if(array.findIndex(function(element){return clipboard==element})!=-1){
    return url+clipboard;//http://google.com/search?q=hello;
  }else{
    return false;
  }
};
