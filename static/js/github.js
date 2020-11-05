$(function(){
  $(document).on('click','.btn-link', function(e) {
  	if($(this).attr("data-expanded")=="true"){
  	  $(this).parent().addClass("open");
  	  $(this).attr("data-expanded","false");
  	}else{
  	  $(this).parent().removeClass("open");
  	  $(this).attr("data-expanded","true");
  	}
    $(this).blur();
  });
});