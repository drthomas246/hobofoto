var head;
$(function() {
  var body = $(".UnderlineNav-body");
  head = $(".UnderlineNav");
  var body_top = body.offset().top;
  var sidebar_left = body.offset().left;
  head.before('<div id="navDmy" style="display:none;"></div>');

  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if(scroll >= body_top) {
      head.css({
        position: "fixed",
        top: 0,
        left: sidebar_left,
        height:"56px",
        "z-index": 70,
        background: "#fff"
      });
      $("#navDmy").show();
    } else {
      head.css({
        position: "static",
        top: "auto",
        left: sidebar_left,
        bottom: "auto",
        height: "100%"
      });
      $("#navDmy").hide();
    }
  });
});

$(function() {
  var nav = $("#header");
  var side = $(".vcard-names-container");
  var sidetext_top = side.offset().top;

  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if(scroll >= sidetext_top) {
      nav.css({
        top: 0,
        left: 0
      });
    }else{
      nav.css({top:"-56px"});
    }
});
});