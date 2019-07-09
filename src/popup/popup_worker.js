onmessage = function(e) {
  var workerResult = logic(e.data.clip,e.data.config);
  postMessage(workerResult);
}

function logic(clipboard,config){
  var returnURLArray = config.specs.reduce((acc, specItem) => {
    let func = new Function("clipboard","url","arrayOrPattern",specItem.func);
    
    //Execute func to obtain URL to navigate
    let returnURL = func(clipboard, specItem.url, specItem.arrayOrPattern);
    acc.push(returnURL);
    return acc;
    }, []);
  return returnURLArray;
}