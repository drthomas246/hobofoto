function window_resize(){
var window_width = $(window).width();
var window_height = window_width/3;
$('iframe').css({
  width: window_width,
  height: window_height
});
}

$(window).resize(function(){
window_resize();
});

window_resize();
var parallaxGyro = function () {
  var src = $("iframe").attr("src");
  $("iframe")
  .attr("src","")
  .attr("src",src);
}

// ジャイロセンサーの有無確認
var isGyro = false;
if ((window.DeviceOrientationEvent) && ('ontouchstart' in window)) {
  isGyro = true;
}

//PCなど非ジャイロの場合
if (!isGyro) {
  parallaxGyro();
//ジャイロ持ちデバイス
} else {
  //ジャイロ動作確認
  var resGyro = false;
  window.addEventListener("deviceorientation", doGyro, false);

  function doGyro() {
    resGyro = true;
    window.removeEventListener("deviceorientation", doGyro, false);
  }

  setTimeout(function () {
    //ジャイロが動作する場合
    if (resGyro) {
      parallaxGyro();
    //ジャイロが動作しない場合
    } else {
      //iOS13以上ならクリックイベントを要求
      if (typeof DeviceOrientationEvent.requestPermission === "function") {
        //ユーザアクションを得るための要素を表示
        $('#request').show();
        $('#request_button').on("click", function () {
          $('#request').hide();
          DeviceOrientationEvent.requestPermission().then(res => {
            //「動作と方向」が許可された
            if (res === "granted") {
              parallaxGyro();
              //「動作と方向」が許可されなかった
            } else {
              isGyro = false;
              parallaxGyro();
            }
          });
        });
        //iOS13以上ではない場合
        } else {
          isGyro = false;
          parallaxGyro();
        }
    }
  }, 300);
}