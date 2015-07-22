initializeDefaultLocalStorageValues();

function initializeDefaultLocalStorageValues() {
 if (localStorage.getItem('default_values_initialized')) {
   return;
 }

 localStorage.setItem('default_values_initialized', true);

 var blacklist = ["*://www.reddit.com/*", "*://*.cnn.com/*"];
 localStorage["blacklist"] = JSON.stringify(blacklist);
}

var redirectListener = function(info) {
  return {redirectUrl: chrome.extension.getURL("/uTurn.html")} ;
};

var loadSettings = function(info) {
  console.log("Reloading url_list");

  var url_list = JSON.parse(localStorage["blacklist"] || null);

  if( chrome.webRequest.onBeforeRequest.hasListeners() )
      chrome.webRequest.onBeforeRequest.removeListener(redirectListener);

  if(url_list) {
    chrome.webRequest.onBeforeRequest.addListener(
      redirectListener,
      {
        urls: url_list, 
        types: ['main_frame'] 
      }, 
      ["blocking"]
    );

  }
}

loadSettings();
