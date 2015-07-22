$(function() {
  loadOptions();

  $(".saveable").change(saveOptions);
});

function loadOptions() {
  $('#adsOff').prop('checked', localStorage['adsOff'] == "true");

  var blacklist = JSON.parse(localStorage["blacklist"] || null);

  $.each(blacklist, function( index, value ) {
    var wrapper = $('<div />').appendTo('#blacklist');

    wrapper.html(value);
  });
}

function saveOptions() {  
  var adsOff = $("#adsOff").is(':checked');

  localStorage["adsOff"] = adsOff;  

  chrome.extension.getBackgroundPage().loadSettings();

}
