$('#contact').validate({
  rules: {
    name: {
      required: true
    },
    email: {
      required: true,
      email: true
    },
    message: {
      required: true
    }
  },
  messages: {
    name: {
      required: "お名前を入力ください。"
    },
    email: {
      required: "メールアドレスを入力してください。",
      email: "正しいメールアドレスを入力してください。"
    },
    message: {
      required: "ご質問を書いてください。"
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