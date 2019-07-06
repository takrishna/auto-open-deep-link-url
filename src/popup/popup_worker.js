onmessage = function(e) {
  var workerResult = logic(e.data.clip,e.data.config);
  postMessage(workerResult);
}

function logic(clipboard,config){
  var returnURLArray = config.specs.reduce((acc, specItem) => {
    this.eval(specItem.func);
    returnURL = func(clipboard, specItem.url, specItem.arrayOrPattern);
    acc.push(returnURL);
    return acc;
    }, []);
  return returnURLArray;
}