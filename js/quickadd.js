
$(function() {
  var currentDomain, currentSubDomain;
  chrome.tabs.query({active: true, lastFocusedWindow: true}, function(tabs) {
    var url = tabs[0].url;

    var domain = String(url).split("//").reverse().shift();
    domain = domain.split("/").shift();

    var host_parts = domain.split(".");

    switch(host_parts.length) {
      case 0:
      case 1:
        //not a valid host.tld domain
        break;
      case 2:
        currentDomain = domain;
        break;
      default:
        currentSubDomain = domain;
        host_parts.shift();
        currentDomain = "*."+host_parts.join(".");
        break;
    } 

    $('#quickAdd').click(function() {
      chrome.extension.getBackgroundPage().quickAddBlacklistDomain(currentDomain);
    });

  });


});
