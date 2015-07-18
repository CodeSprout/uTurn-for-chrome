var url_list = JSON.parse(localStorage["blacklist"] || null);

chrome.webRequest.onBeforeRequest.addListener(
  function(info) { 
    return {redirectUrl: chrome.extension.getURL("/uTurn.html") };
  },
  {
    urls: url_list, 
    types: ['main_frame'] 
  }, 
  ["blocking"]
);
