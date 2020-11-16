function time(){
  var manth = new Array("January","February","March","April","May","June","July","August","September","October","Nobember","December");
  var elements = document.querySelectorAll( "relative-time" );
  for (var i = 0; i < elements.length; i++) {
    var time = elements[i].getAttribute("datetime");
    var date = new Date(time);
    var today = new Date();
    var termDay = (today - date) / 86400000;
    if(termDay<1){
        termDay = Math.floor((today - date) / 3600000) + "時間前";
    }else if(termDay>31){
        termDay = manth[date.getMonth()] + " " + ( '00' + date.getDate() ).slice( -2 ) + "," + date.getFullYear();
    }else{
        termDay = Math.floor((today - date) / 86400000) + "日前";
    }
    elements[i].innerHTML = termDay;
  }
}
function avatar(){
  var min_avatar = document.getElementById('min_avatar');
  if(min_avatar){
    min_avatar.addEventListener('click', function() {
      min_avatar.classList.toggle('is-open');
    }, false);
  }
}
avatar();
time();