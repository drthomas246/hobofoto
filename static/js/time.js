$(function() {
  var manth = new Array("January","February","March","April","May","June","July","August","September","October","Nobember","December");
  $("relative-time").each(function(i){
    var time = $(this).attr("datetime");
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
    $(this).text(termDay);
  });
});