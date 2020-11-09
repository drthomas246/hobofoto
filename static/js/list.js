$(function() {
  var list = $(".profile-timeline-year-list");
  var buttom = $("#posts-count");
  var position = $(".js-yearly-contributions");
  var profile = $(".profile-timeline");
  var year = $("#year-list");
  var listbox_top = buttom.offset().top;
  var position_height = position.height();
  var profile_left = profile.offset().left;
  var profile_width = profile.width();
  var year_width = year.width();

  $(window).on("scroll", function() {
    var scroll = $(window).scrollTop();
    if(scroll >= (listbox_top + position_height - 60)){
      list.css({
        position: "fixed",
        top: 86,
        left: profile_width + profile_left,
        width: year_width + 32
      });
    }else{
      list.css({
        position: "static",
        top: "auto",
        left: "auto"
      });
    }
  });
});