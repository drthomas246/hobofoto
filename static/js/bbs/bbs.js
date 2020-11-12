  window.onload = onloads();
  $('#bbs').validate({
    rules: {
      name: {
        required: true
      },
      mail: {
        email: true
      },
      text: {
        required: true
      }
    },
    messages: {
      name: {
        required: "何か入力してください。"
      },
      mail: {
        email: "正しいメールアドレスを入力してください。"
      },
      text: {
        required: "メッセージをどうぞ。"
      }
    },
    errorClass:"error"
  });
  $("#text").autosize();
  $("#mail").emailautocomplete({
    domains: [
      'yahoo.co.jp',
      'gmail.com',
      'ezweb.ne.jp',
      'au.com',
      'docomo.ne.jp',
      'i.softbank.jp',
      'softbank.ne.jp',
      'excite.co.jp',
      'googlemail.com',
      'hotmail.co.jp',
      'hotmail.com',
      'icloud.com',
      'live.jp',
      'me.com',
      'mineo.jp',
      'nifty.com',
      'outlook.com',
      'outlook.jp',
      'yahoo.ne.jp',
      'ybb.ne.jp',
      'ymobile.ne.jp'
    ]
  });


function sends(){
    if(!($('#bbs').valid())){
        return;
    }
    var param = {
      "parameter": "send",
      "name": $("#name").val(),
      "mail": $("#mail").val(),
      "text": $("#text").val()
    };
    $.ajax({
        type: "POST",
        url: "https://www.hobofoto.net/cgi-bin/cgi/bbs/php/bbs.php",
        data: param,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(bbs){
        $("#text").val('');
        prints(1, bbs.bbs, false);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert('正しい結果を得られませんでした。');
    });
}

function onloads(page = 1, buttonClick = false){
    var param = { "parameter": "get" };
    $.ajax({
        type: "POST",
        url: "https://www.hobofoto.net/cgi-bin/cgi/bbs/php/bbs.php",
        data: param,
        dataType : "json",
        scriptCharset: 'utf-8'
    }).done(function(bbs){
        prints(page, bbs.bbs, buttonClick);
    }).fail(function(XMLHttpRequest, textStatus, errorThrown){
        alert('正しい結果を得られませんでした。');
    });
}

function prints(page, bbs, buttonClick){
    var dataArray = bbs.split('\n');
    var array = [];
    var kugiri = 10;
    var pageMax = Math.ceil(dataArray.length / kugiri);
    var front = page - 2;
    var back = page + 3;
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
