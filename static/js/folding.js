function folding(){
  var body = document.getElementById('UnderlineNav-body');
  var head = document.getElementById('UnderlineNav');
  var navDmy = document.getElementById('navDmy');
  var body_top = body.offsetTop;
  var sidebar_left = body.offsetLeft;

  var nav = document.getElementById('header');
  var side = document.getElementById('vcard-names-container');
  var sidetext_top = side.offsetTop;

  var list = document.getElementById('profile-timeline-year-list');
  if(list != null){
    var buttom = document.getElementById('position-relative');
    var year = document.getElementById('year-list');
    var listbox_top = buttom.offsetTop;
    var position_height = buttom.offsetHeight;
    var profile_width = buttom.offsetWidth;
    var year_width = year.offsetWidth + 32;
    var list_width = sidebar_left + profile_width - year_width;
    var profile_height = listbox_top + position_height - 56 - 24 - 30;
  }

  var scrollElm = (function () {
    if ('scrollingElement' in document) {
      return document.scrollingElement;
    }
    if (navigator.userAgent.indexOf('WebKit') != -1) {
      return document.body;
    }
    return document.documentElement;
  })();

    window.addEventListener('scroll', function() {
    var scroll = scrollElm.scrollTop;
    if(scroll >= body_top) {
      head.setAttribute('style', 'position: fixed; top: 0; left: '+ sidebar_left +'px; height: 56px; z-index: 70;');
      navDmy.style.display = 'block';
    }else{
      head.setAttribute('style', 'position: static; top: auto; left: '+sidebar_left +'; bottom: auto; height: 100%;');
      navDmy.style.display = 'none';
    }
    if(scroll >= sidetext_top) {
      nav.setAttribute('style', 'top: 0; left: 0;');
    }else{
      nav.setAttribute('style', 'top:-56px;');
    }
    if (list != null){
      if(scroll >= profile_height){
      list.setAttribute('style', 'position: fixed; top: 86px; left: '+list_width+'px; width: '+year_width+'px;');
      }else{
        list.setAttribute('style', 'position: static; top: auto; left: auto');
      }
    }  
  });
}