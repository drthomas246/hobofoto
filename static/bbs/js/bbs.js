$(function(){
    var param = { "parameter": "get" };
    //var param = "困ったな";

    $.ajax({
        type: "POST",
        url: "get.php",
        data: param,
        crossDomain: false,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data){
        $("#bbs-data").html(data.data);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert('正しい結果を得られませんでした。');
    });
});