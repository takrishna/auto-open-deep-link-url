'use strict';

let autoOpen = document.getElementById('autoOpen');

chrome.storage.local.get('autoOpen', function (data) {
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

if (window.Worker) {
  var myWorker = new Worker('popup_worker.js');  
  myWorker.onmessage = function(e) {
    var ett;
    for(let i=0, j=0;i<e.data.length;i++){
      if (!e.data[i])
        continue;
      else{
        j++;
        var tpl = "<div class='rowitem'>"+
            "<input title='"+e.data[i]+"' readonly class='inlinesp' type='text' value='"+j+". "+e.data[i]+"'/>"+
            //"<span class='inlinesp' id='itemOne' title='"+e.data[i]+"'>"+j+". "+e.data[i]+"</span>"+
            "<span class='aside-icons'>" +
            "<a class='copyimg' href=$c$o$p$ytoclipboard"+e.data[i]+"></a>" +
            //"<span class='copyimg' ></span>" +
            "<a class='goimg' href="+e.data[i]+"></a>" +
            "</span>"+
            "</div>";
        if (ett)
          ett = ett + tpl;
        else
          ett = tpl;
      }
    }
      document.getElementById("anchor").innerHTML = (ett)?ett:"<div style='margin-top:10px;'> No Match </div>";
  }
  postMessage();
}

//Keyup listener
textarea.addEventListener("keyup",clipboardChange);
function clipboardChange(data){
  clipboard = textarea.value;
  postMessage();
}

//Post to Worker
function postMessage(){
  chrome.storage.local.get("specs", function (config) {
    myWorker.postMessage({"clip":clipboard,"config":config});
  })
}

autoOpen.addEventListener("click", save);
function save() {
  if (autoOpen.checked)
    chrome.storage.local.set({ 'autoOpen': true }, function (data) {});
  else
    chrome.storage.local.set({ 'autoOpen': false }, function (data) {});
}

  window.addEventListener('click',function(e){
    if(e.target.href!==undefined){
      if(e.target.href.includes("$c$o$p$ytoclipboard")){
        e.preventDefault();
        let textarea = document.getElementById('clipboard');
        textarea.value = e.target.href.split("$c$o$p$ytoclipboard")[1];
        textarea.select();
        if (document.execCommand('copy')) {
          textarea.value = clipboard;
        } else {
          console.error('Unable to get clipboard content');
        }
      }else
      chrome.tabs.create({url:e.target.href})
    }
})