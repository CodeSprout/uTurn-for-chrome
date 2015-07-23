$(function() {
  loadOptions();

  $(".saveable").change(saveOptions);
});

function loadOptions() {
  $('#adsOff').prop('checked', localStorage['adsOff'] == "true");

  var blacklist = JSON.parse(localStorage["blacklist"] || null);

  $.each(blacklist, function( index, value ) {
    var wrapper = $("<div class='blitem'/>").appendTo('#blacklist');

    wrapper.html(value);

    wrapper.click( function() {
      chrome.extension.getBackgroundPage().dropBlacklistDomainByIndex(index);
    });
  });
}

function saveOptions() {  
  var adsOff = $("#adsOff").is(':checked');

  localStorage["adsOff"] = adsOff;  

  chrome.extension.getBackgroundPage().loadSettings();

}
