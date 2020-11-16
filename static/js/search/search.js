var lunrIndex, pagesIndex, check_over, check_search;

function initLunr() {
  var json="/index.json";
  var myJSON = new XMLHttpRequest();
  myJSON.onreadystatechange = function(){
    if((myJSON.readyState === 4) && (myJSON.status === 200)){
      pagesIndex = JSON.parse(myJSON.responseText);
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
    }
  }
  myJSON.open("get",json, true);
  myJSON.send(null);
  // .fail(function(jqxhr, textStatus, error) {
  //   var err = textStatus + ", " + error;
  //   console.error("Error getting Hugo index flie:", err);
  // });
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
    
    htmls.push(createEntry(result.ref, buf.title, buf.contents, startPos, endPos, buf.date, buf.lastmod));
  });
  showResult(htmls.join(''), results.length, query);
}

function createEntry(url, title, body, startPos, endPos, date, lastmod) {
  var data = '<li class="col-12 d-flex width-full py-4 border-bottom public fork"><div class="col-12 col-lg-12 d-inline-block"><div class="d-inline-block mb-1"><h3>' +
      '<a href="' + url + '" class="posts-post">' + title + '</a>' +
      '</h3></div><div class="posts-post text-gray mb-2 pr-4">' + excerpt(body, startPos, endPos) + '</div><div class="f6 text-gray mt-2">Updated <relative-time datetime="' + date + '" class="no-wrap" title="Modifyd at '+ lastmod + '"></relative-time></div>' +
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
  var search = document.getElementById('search');
  search.innerHTML = contents;
  var options = {
    "element": "span",
    "className": "text-bold bg-yellow-light rounded-1 d-inline-block"
  };
  var context = document.getElementsByClassName("posts-post");
  for(var i = 0; i < context.length; i++){
    var instance = new Mark(context[i]);
    query.split(/ |　/).forEach(function(val){
      instance.mark(val, options);
    });
  }
}

var searchbox = document.getElementById('searchbox');
var dropdown = document.getElementById('dropdown');
var dropdown_body = document.getElementById('dropdown__body');
searchbox.addEventListener('keypress', function(e) {
  if(e.which == 13){
    check_search = true;
    var query = searchbox.value;
    search(query);
    searchbox.blur();
    folding();
    time();
  }
}, false);

dropdown_body.addEventListener('mouseover', function(e) {
  check_over = false;
}, false);
dropdown_body.addEventListener('mouseout', function(e) {
  check_over = true;
}, false);

searchbox.addEventListener('focusin', function(e) {
  dropdown.classList.add('is-open');
  searchbox.classList.add('jump-to-dropdown-visible');
  searchbox.classList.add('jump-to-field-active');
  Velocity(dropdown_body,{width: "470px"},{duration:200,queue:false});
  Velocity(dropdown,{width: "470px"},{
    duration:200,
    queue:false,
    complete:function(){
      check_over = true;
      check_search = false;
    }
  });
}, false);
searchbox.addEventListener('focusout', function(e) {
  if(check_search){
    Velocity(dropdown_body,{width: "300px"},{duration:0,queue:false});
    Velocity(dropdown,{width: "300px"},{duration:200,queue:false});
    dropdown.classList.remove('is-open');
    searchbox.classList.remove('jump-to-field-active');
    searchbox.classList.remove('jump-to-dropdown-visible');
  }else if(check_over){
    Velocity(dropdown_body,{width: "300px"},{duration:200,queue:false});
    dropdown_body.setAttribute('style', 'width: 300px;');
    Velocity(dropdown,{width: "300px"},{
      duration:200,
      queue:false,
      complete:function(){
        dropdown.classList.remove('is-open');
        searchbox.classList.remove('jump-to-field-active');
        searchbox.classList.remove('jump-to-dropdown-visible');
      }
    });
  }
}, false);