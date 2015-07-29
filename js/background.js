var lastBlockedUrl = "";
var gracePeriodStartTime = 0;
var bInGracePeriod = false;

function saveToLocalStorage ( blacklist ) {
  blacklist = $.unique(blacklist);

  localStorage["blacklist"] = JSON.stringify(blacklist);
  loadSettings();
}

function dropBlacklistDomainByIndex( index ) {
  var blacklist = JSON.parse(localStorage["blacklist"]);

  blacklist.splice(index,1);

  saveToLocalStorage(blacklist);
}

function addBlacklistDomain( url ) {
  var blacklist = JSON.parse(localStorage["blacklist"]);

  blacklist.push(url);

  saveToLocalStorage(blacklist);
}

function initDefaultLocalStorageValues() {
  if (localStorage.getItem('default_values_initialized')) {
    return;
  }

  localStorage.setItem('default_values_initialized', true);

  var blacklist = ["*.facebook.com"];

  saveToLocalStorage(blacklist);
}

var redirectListener = function(details) {
  if (bInGracePeriod) {
    console.log("Grace Period Detected");
    var elapsed;

    elapsed = new Date().getTime() - gracePeriodStartTime;
    console.log(elapsed);
    console.log(gracePeriodStartTime);
 
    if (elapsed > 1000*60*1) {
      bInGracePeriod = false;

      console.log("Grace Period Cancelled");

    }
  } 

  if (!bInGracePeriod) {
    lastBlockedURL = details['url'];
    return {redirectUrl: chrome.extension.getURL("/uTurn.html")} ;
  }
};

function loadSettings() {

  var url_list = JSON.parse(localStorage["blacklist"] || null);

  if( chrome.webRequest.onBeforeRequest.hasListeners() )
      chrome.webRequest.onBeforeRequest.removeListener(redirectListener);

  if(url_list) {
    for (var i = 0; i < url_list.length; i++) {
      url_list[i] = "*://"+url_list[i]+"/*";
    }

    console.log(url_list);

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

initDefaultLocalStorageValues();
loadSettings();

function startGracePeriod() {
  gracePeriodStartTime = new Date().getTime();
  bInGracePeriod = true;
}
