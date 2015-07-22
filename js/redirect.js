


var bRunning = true;
var timer = 60;
bRunning = true;
var pane = 1;

window.addEventListener('focus', function() {
  bRunning = true;
});
window.addEventListener('blur', function() {
  bRunning = false;   
});

document.addEventListener('DOMContentLoaded', init);

function init() {

  setInterval(function () {
    if(bRunning && pane == 3) {
      var countdown = $('#countdown');

      timer--;
      countdown.html(timer);
    }
  }, 1000);

  $('next1').click( function() {
    pane++;
    $('#pane1').css('display','none');
    $('#pane2').css('display','block');
  });

  $('#next2').click( function() {
    pane++;
    $('#pane2').css('display','none');
    $('#pane3').css('display','block');
  });
}
