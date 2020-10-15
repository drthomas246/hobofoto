function sends(){
    if ($('#bbs')[0].reportValidity()){
        // var name = $("#name").val();
        // var mail = $("#mail").val();
        // var text = $("#text").val();
        // var param = { "parameter": "send" ,"name": name ,"mail": mail ,"text": text };
        var param = new FormData($('#bbs')[0]);
        alert(param);
        $.ajax({
            type: "POST",
            url: "https://www.hobofoto.net/cgi-bin/cgi/bbs/php/bbs.php",
            data: param,
            dataType : "json",
            scriptCharset: 'utf-8'
        }).done(function(data){
            $("#text").val('');
            prints(1, data.data, false);
        }).fail(function(XMLHttpRequest, textStatus, errorThrown){
            alert('正しい結果を得られませんでした。');
        });
    }
}

function onloads(page = 1, buttonClick = false){
    var param = { "parameter": "get" };
    $.ajax({
        type: "POST",
        url: "https://www.hobofoto.net/cgi-bin/cgi/bbs/php/bbs.php",
        data: param,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(data){
        prints(page, data.data, buttonClick);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert('正しい結果を得られませんでした。');
    });
}

function prints(page, data, buttonClick){
    var dataArray = data.split('\n');
    var array = [];
    var kugiri = 10;
    var pageMax = Math.ceil(dataArray.length / kugiri);
    var front = page - 2;
    var back = page + 3;
    $("#bbs-error").html("");
    if (page != 1){
        var value = "<button type='button' class='nav link' onclick='onloads(" + (page-1) + ", true)'>前へ</button>";
        array.push(value);

    }else{
        var value = "<button type='button' class='nav cursor-normal' disabled>前へ</button>";
        array.push(value);
    }
    if (page <= 5){
        for (var i = 1; i <= 10; i++) {
            if (page == i){
                var value = "<button type='button' class='number num-normal'>" + i + "</button>";
            }else{
                var value = "<button type='button' class='number link' onclick='onloads(" + i + ", true)'>" + i + "</button>";
            }
            array.push(value);
        }
    }else if(page >=(pageMax-4)){
        for (var i = (pageMax-9); i <= pageMax; i++) {
            if (page == i){
                var value = "<button type='button' class='number num-normal'>" + i + "</button>";
            }else{
                var value = "<button type='button' class='number link' onclick='onloads(" + i + ", true)'>" + i + "</button>";
            }
            array.push(value);
        }
    }else{
        for (var i = (page-5); i <= (page+4); i++) {
            if (page == i){
                var value = "<button type='button' class='number num-normal'>" + i + "</button>";
            }else{
                var value = "<button type='button' class='number link' onclick='onloads(" + i + ", true)'>" + i + "</button>";
            }
            array.push(value);
        }
    }
    if (page != pageMax){
        var value = "<button type='button' class='nav link' onclick='onloads(" + (page+1) + ", true)'>次へ</button>";
        array.push(value);

    }else{
        var value = "<button type='button' class='nav cursor-normal' disabled>次へ</button>";
        array.push(value);
    }
    $(".bbs-link").html(array.join(' '));
    var array = [];
    var front = (page - 1) * kugiri;
    var back = front + kugiri;
    for (var i = 0; i < dataArray.length; i++) {
        if (i >= front && i < back){
            array.push(dataArray[i]);
        }
    }
    var html = array.join('');
    countCharcter(html);
    $("#bbs-data").html(html);
    if (buttonClick){
        var scroll = $("#scroll").offset();
        $("body, html").animate({ scrollTop: scroll.top }, 200, "linear");
    }
}
function countCharcter(Charcter){
    $("#count").html(Charcter.replace(/<("[^"]*"|'[^']*'|[^'">])*>/g,'').length + 14);
}
