var lunrIndex, pagesIndex, check_over;
$('#searchbox').ahPlaceholder({
  placeholderColor: '#fff',
  placeholderAttr: 'data-placeholder',
  likeApple: true
});
$(function(){
  $("#searchbox").keypress(function(e){
    if(e.which == 13){
      var query = $('#searchbox').val();
      search(query);
      $('#searchbox').removeClass("is-open");
      $('#searchbox').blur();
      head = $(".UnderlineNav");
      head.before('<div id="navDmy" style="display:none;"></div>');
    }
  });
  $('.dropdown__body')
  .mouseover(function(e){
    check_over = false;
  })
  .mouseout(function(e){
    check_over = true;
  });
  $('#searchbox')
  .focusin(function(e){
    $('#dropdown').animate({width: "470px"},{
      duration:200,
      queue:false,
      complete:function(){
        $('#dropdown').addClass("is-open");
        $('.dropdown__body').css({width: "470px"});
        $('#searchbox').addClass("jump-to-dropdown-visible");
      }
    });
    $('#searchbox').addClass("jump-to-field-active");
    check_over = true;

  })
  .focusout(function(e){
    if(check_over){
      $('.dropdown__body').animate({width: "300px"},{duration:200,queue:false});
      $('#dropdown').animate({width: "300px"},{
        duration:200,
        queue:false,
        complete:function(){
          $('#dropdown').removeClass("is-open");
          $('#searchbox').removeClass("jump-to-field-active");
          $('#searchbox').removeClass("jump-to-dropdown-visible");
        }
      });
    }
  });
});

function initLunr() {
  $.getJSON(json).done(function(index) {
      pagesIndex = index;
      lunrIndex = lunr(function() {
        var lunrConfig = this;
        lunrConfig.use(lunr.ja);
        lunrConfig.ref("href");
        lunrConfig.field("title", { boost: 10 });
        lunrConfig.field("contents");
        pagesIndex.forEach(function(page) {
          lunrConfig.add(page);
        });
      });
    })
  .fail(function(jqxhr, textStatus, error) {
    var err = textStatus + ", " + error;
    console.error("Error getting Hugo index flie:", err);
  });
}

function search(query){
  var htmls = [];
  query = query.trim();
  if (query.length < 1) {
    return result;
  }
  var seachbuf = '';
  query.split(/ |　/).forEach(function(val){
    var searchTerm = [];
    var tokens = lunr.ja.tokenizer(val);
    tokens.forEach((token) => {
      const queryString = token.toString();
      searchTerm.push(queryString);
    });
    seachbuf = seachbuf + ' +' + searchTerm.join(' ');
  })
  var results = lunrIndex.search(seachbuf);
  results = results.filter(result => result.score >= 1);
  results.map(function(result) {
    buf = pagesIndex.filter(function(page) {
      return page.href === result.ref;
    })[0];
    var re = new RegExp(query.split(/ |　/)[0], 'i');
    var Pos = buf.contents.search(re);
    if(Pos <=40){
      var startPos = 40;
      var endPos = startPos;
    }else{
      var startPos = Pos;
      var endPos = startPos + query.split(/ |　/)[0].length;
    }
    
    htmls.push(createEntry(result.ref, buf.title, buf.contents, startPos, endPos, buf.date, buf.lastmod, buf.date2));
  });
  showResult(htmls.join(''), results.length, query);
}

function createEntry(url, title, body, startPos, endPos, date, lastmod, date2) {
  var data = '<li class="col-12 d-flex width-full py-4 border-bottom public fork"><div class="col-12 col-lg-12 d-inline-block"><div class="d-inline-block mb-1"><h3>' +
      '<a href="' + url + '" class="posts-post">' + title + '</a>' +
      '</h3></div><div class="posts-post text-gray mb-2 pr-4">' + excerpt(body, startPos, endPos) + '</div><div class="f6 text-gray mt-2">Updated <relative-time datetime="' + date + '" class="no-wrap" title="Modifyd at '+ lastmod + '">' + date2 + '</relative-time></div>' +
      '</li>'
  return data;
}
function excerpt(body, startPos, endPos) {
  return body.substring(startPos - 40, endPos + 40);
}
function showResult(html, count, query) {
  var contents = base+ '<h2 id="search">' + count + ` page results in HoBoFoTo</h2>
          <ul data-filterable-for="your-repos-filter" data-filterable-type="substring">`
  + html + `          </ul>
        </div>
    </div>
</div>`;
  $("#search").html(contents);
  var options = {
    "element": "span",
    "className": "text-bold bg-yellow-light rounded-1 d-inline-block"
  };
  query.split(/ |　/).forEach(function(val){
    $(".posts-post").mark(val, options);
  })
}