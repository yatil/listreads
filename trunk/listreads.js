/*
	Code by Eric Eggert — yatil.de                                
	
	heavily inspired by Chris Heilmann’s useful tweets script
	http://www.wait-till-i.com/2008/09/28/useful-tweets-with-pipe/
	
	USAGE: Replace XXXX with your username. Enjoy:
	
	<div id="myreads" class="user-XXXX">
	  <a href="http://readernaut.com/XXXX">My reads</a>
	</div>
	<script type="text/javascript" src="PATHTOSCRIPT"></script>
*/

var reads = function(){
  var x = document.getElementById('myreads');
  if(x){
    var readernautUserId = x.className.replace('user-','');
    var s = document.createElement('script');
    s.type = 'text/javascript';                   
    s.src = 'http://pipes.yahoo.com/pipes/pipe.run?' + 
    '_id=rDUOnNf93RG3QxqkdfQQIA&_render=json' +
    '&username=' + readernautUserId + '&_callback=reads.read';
    document.getElementsByTagName('head')[0].appendChild(s);
  };
  function read(data){
      if(data && data.value && data.value.items){
          if(typeof data.value.items.length !== 'undefined'){
            var ul = document.createElement('ul');
            var all = data.value.items.length;
            //var end = all > 5 ? 5 : all;
            for(var i=0;i < all;i++){
              var current = data.value.items[i];
              var li = document.createElement('li');
              var a = document.createElement('a');                                                                      
			  var img = document.createElement('img');
			  img.src = current.book_edition.covers.cover_small;
              a.href = current.permalink;
			  a.alt = "";
			  a.appendChild(img);
              a.appendChild(document.createTextNode(current.book_edition.title + ' by ' + current.book_edition.authors.author));
              li.appendChild(a);
              ul.appendChild(li);
            }
            x.appendChild(ul);
        }
      }
    };
  return{
    read:read
  }
}();