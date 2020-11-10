$(function(){
  var window_width = $(window).width();
  var window_height = window_width/3;
  var scale = Math.round(window_width/1350*100);
  var man_width = 188*scale/100;
  var man_height = 247*scale/100;
  var ship_width = 440*scale/100;
  var speak_width = 271*scale/100;
  var speak_height = 249*scale/100;
  var house_width = 304*scale/100;

  $("#man img").width(Math.floor(man_width));
  $("#ship img").width(Math.floor(ship_width));
  $("#speak img").width(Math.floor(speak_width));
  $("#house img").width(Math.floor(house_width));

  var man_left = Math.floor(window_width/2 - man_width/2);
  var man_top = Math.floor(window_height - man_height - window_height/8);
  var ship_left = Math.floor(man_left + man_width*2/3);
  var ship_top = Math.floor(window_height - man_height - window_height/4);
  var speak_left = Math.floor(man_left - speak_width - window_width/60);
  var speak_top = Math.floor(window_height - speak_height - window_height/4);
  var house_left = Math.floor(window_width/2 - house_width/2);
  var house_top = Math.floor(window_height/20);

  $("#man").attr("data-pos-x", man_left);
  $("#man").attr("data-pos-y", man_top);
  $("#ship").attr("data-pos-x", ship_left);
  $("#ship").attr("data-pos-y", ship_top);
  $("#speak").attr("data-pos-x", speak_left);
  $("#speak").attr("data-pos-y", speak_top);
  $("#house").attr("data-pos-x", house_left);
  $("#house").attr("data-pos-y", house_top);

  var layer =$('#layer').get(0);
  var parallax = new Parallax(layer,{
  	hoverOnly: true
  });
});