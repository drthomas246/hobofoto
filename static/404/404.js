$(function(){
  var window_width = $(window).width();
  var window_height = window_width/3;
  var scale = Math.round(window_width/1350*100);
  var man_width = $("#man img").width()*scale/100;
  var man_height = $("#man img").height()*scale/100;
  var man_shadow_width = $("#man-shadow img").width()*scale/100;
  var man_shadow_height = $("#man-shadow img").height()*scale/100;
  var ship_width = $("#ship img").width()*scale/100;
  var ship_shadow_width = $("#ship-shadow img").width()*scale/100;
  var speak_width = $("#speak img").width()*scale/100;
  var speak_height = $("#speak img").height()*scale/100;
  var house_width = $("#house img").width()*scale/100;
  var house2_width = $("#house2 img").width()*scale/100;

  $("#man img").width(man_width);
  $("#man-shadow img").width(man_shadow_width);
  $("#ship img").width(ship_width);
  $("#ship-shadow img").width(ship_shadow_width);
  $("#speak img").width(speak_width);
  $("#house img").width(house_width);
  $("#house2 img").width(house2_width);

  var man_left = Math.floor(window_width/2 - man_width/2);
  var man_top = Math.floor(window_height - man_height - window_height/8);
  var man_shadow_left = Math.floor(window_width/2 - man_shadow_width/2);
  var man_shadow_top = Math.floor(window_height - man_shadow_height - window_height/12);
  var ship_left = Math.floor(man_left + man_width*2/3);
  var ship_top = Math.floor(window_height - man_height - window_height/4);
  var ship_shadow_top = Math.floor(window_height - man_height + window_height/8);
  var speak_left = Math.floor(man_left - speak_width - window_width/60);
  var speak_top = Math.floor(window_height - speak_height - window_height/4);
  var house_left = Math.floor(window_width/2 - house_width/2);
  var house_top = Math.floor(window_height/20);
  var house2_left = Math.floor(window_width/2 + house_width);
  var house2_top = Math.floor(window_height/8);

  $("#man").attr("data-pos-x", man_left);
  $("#man").attr("data-pos-y", man_top);
  $("#man-shadow").attr("data-pos-x", man_shadow_left);
  $("#man-shadow").attr("data-pos-y", man_shadow_top);
  $("#ship").attr("data-pos-x", ship_left);
  $("#ship").attr("data-pos-y", ship_top);
  $("#ship-shadow").attr("data-pos-x", ship_left);
  $("#ship-shadow").attr("data-pos-y", ship_shadow_top);
  $("#speak").attr("data-pos-x", speak_left);
  $("#speak").attr("data-pos-y", speak_top);
  $("#house").attr("data-pos-x", house_left);
  $("#house").attr("data-pos-y", house_top);
  $("#house2").attr("data-pos-x", house2_left);
  $("#house2").attr("data-pos-y", house2_top);

  var layer =$('#layer').get(0);
  var parallax = new Parallax(layer,{
  	hoverOnly: true
  });
});