

document.addEventListener('DOMContentLoaded', loadOptions);

var settings = document.getElementsByClassName( 'saveable' );
for(var i = 0; i < settings.length; i++)
{
  settings.item(i).addEventListener('change',saveOptions);
}

function loadOptions() {
  var adsOff = localStorage["adsOff"];
  var select = document.getElementById("adsOff");
  
  select.checked = adsOff;

  var blacklist = JSON.parse(localStorage["blacklist"] || null);

}

function saveOptions() {
  var select = document.getElementById("adsOff");
  
  var adsOff = select.checked;

  localStorage["adsOff"] = adsOff;  

  var blacklist = ["*://www.reddit.com/*", "*://*.cnn.com/*"];

  localStorage["blacklist"] = JSON.stringify(blacklist);

}
