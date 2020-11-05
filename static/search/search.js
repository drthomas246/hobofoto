add_flg = false;
$(function(){
  $("#searchbox").keypress(function(e){
    if(e.which == 13){
      var query = $('#searchbox').val();
      var result = searchData(query);
      var html = createHtml(result);
      showResult(html, result.length);
      $('#searchbox').removeClass("is-open");
      $('#searchbox').blur();
    }
  });
  $('#dropdown').on('transitionstart',function(){
    if(add_flg == false){
      $('#searchbox').addClass("is-open");
      add_flg = true;
    }else{
      $('#searchbox').removeClass("is-open");
      add_flg = false;
    }
  });
  $('#searchbox')
    .focusin(function(e) { 
      $(this).addClass("jump-to-field-active");
      $(this).addClass("jump-to-dropdown-visible");
    })
    .focusout(function(e) {
      $(this).removeClass("jump-to-field-active");
      $(this).removeClass("jump-to-dropdown-visible");
    });
});

function searchData(query) {
  var result = [];

  query = query.trim();
  if (query.length < 1) {
    return result;
  }
  var re = new RegExp(query, 'i');
  for (var i = 0; i < data.length; ++i) {
    var pos = data[i].body.search(re);
    if (pos != -1) {
      result.push([i, pos, pos + query.length]);
    }
  }
  return result;
}

function createHtml(result) {
  var htmls = [];
  for (var i = 0; i < result.length; ++i) {
    var dataIndex = result[i][0];
    var startPos = result[i][1];
    var endPos = result[i][2];
    var url = data[dataIndex].url;
    var title = data[dataIndex].title;
    var body = data[dataIndex].body;
    var date = data[dataIndex].date;
    var lastmod = data[dataIndex].lastmod;
    var date2 = data[dataIndex].date2;
    htmls.push(createEntry(url, title, body, startPos, endPos, date, lastmod, date2));
  }
  return htmls.join('');
}

function createEntry(url, title, body, startPos, endPos, date, lastmod, date2) {
  var data = '<li class="col-12 d-flex width-full py-4 border-bottom public fork"><div class="col-12 col-lg-12 d-inline-block"><div class="d-inline-block mb-1"><h3>' +
      '<a href="' + url + '">' + title + '</a>' +
      '</h3></div><div name="posts-post" class="text-gray mb-2 pr-4">' + excerpt(body, startPos, endPos) + '</div><div class="f6 text-gray mt-2">Updated <relative-time datetime="' + date + '" class="no-wrap" title="Modifyd at '+ lastmod + '">' + date2 + '</relative-time></div>' +
      '</li>'
  return data;
}
function excerpt(body, startPos, endPos) {
  return [
    body.substring(startPos - 20, startPos),
    '<b class="bg-yellow-light">', body.substring(startPos, endPos), '</b>',
    body.substring(endPos, endPos + 20)
  ].join('');
}

function showResult(html, count) {
  var contents = base+ '<h2 id="search">' + count + ` page results in HoBoFoTo</h2>
          <ul data-filterable-for="your-repos-filter" data-filterable-type="substring">`
  + html + `          </ul>
        </div>
    </div>
</div>`;
  $("#search").html(contents);
}