if(document.getElementsByClassName("btn-link")){
  addDynamicEventListener(document.body, 'click', '.btn-link', function (e) {
    if(e.delegatedTarget.getAttribute("data-expanded")=="true"){
      e.delegatedTarget.setAttribute("data-expanded","false");
      e.delegatedTarget.parentNode.classList.add('open');
    }else{
      e.delegatedTarget.setAttribute("data-expanded","true");
      e.delegatedTarget.parentNode.classList.remove('open');
    }
  });
}