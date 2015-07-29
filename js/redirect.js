var storedURL = "";

var Route = function (image, description, url) {
  this.image = image;
  this.description = description;
  this.url = url;
}

var routes = [
  [
    new Route ("/resources/images/dishes.jpg", "Wash a few dishes.", ""),
    new Route ("/resources/images/cleandesk.jpg", "Straighten up your desk.", ""),
    new Route ("/resources/images/inboxzero.jpg", "Clear out some email. Can you reach Inbox Zero?", ""),
  ],[
    new Route ("/resources/images/water.jpg", "Drink a glass of water.", ""),
  ],[
    new Route ("/resources/images/rice.jpg", "Make rice", ""),
  ],[
    new Route ("/resources/images/npr.jpg", "Great storytelling and rigorous reporting.", "http://npr.org"),
  ],
];


function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


var bRunning = true;
var timer = 60;
var pane = 1;

window.addEventListener('focus', function() {
  bRunning = true;
});
window.addEventListener('blur', function() {
  bRunning = false;   
});

document.addEventListener('DOMContentLoaded', init);

function init() {

  storedURL = chrome.extension.getBackgroundPage().lastBlockedURL;

  shuffle(routes[0]);
  shuffle(routes[1]);
  shuffle(routes[2]);
  shuffle(routes[3]);

  var icons = ["#icon1","#icon2","#icon3","#icon4"];

  for (i = 0; i < icons.length; i++) { 
    $(icons[i]).html("<img src=" + routes[i][0].image + "/>");
    $(icons[i]).append("<div class='icon_description'>"+ routes[i][0].description  +"</div>");
  }

  setInterval(function () {
    if(bRunning && pane == 3 && timer > 0) {
      var countdown = $('#countdown');

      timer--;
      countdown.html("0:" + ('0'+timer).slice(-2));

      if(timer <= 0 ) {
        countdown.html("&nbsp;OK&nbsp;");
        $('#next3').css('display', 'block');
      }
    }
  }, 1000);

  $('#next1').click( function() {
    pane++;
    $('#pane1').css('display','none');
    $('#pane2').css('display','block');
  });

  $('#next2').click( function() {
    pane++;
    $('#pane2').css('display','none');
    $('#pane3').css('display','block');
  });

  $('#next3').click( function() {
    chrome.extension.getBackgroundPage().startGracePeriod();
    
    window.location.href = storedURL;
  });
}
