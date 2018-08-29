$(function(){
      $('#submit').click(function(e){
            e.preventDefault();
            console.log('select_link clicked');

                    //something is wrong with var here
					 var data = {};
           data.searchZip = $('#searchZip').val();
           $.ajax({
  						type: 'GET',
  						data: data,
  				    contentType: 'application/json',
              url: 'http://localhost:5000/games/endpoint',
              success: function(response) {
                  console.log(response.games[0].title);
                  //manipulate info here, pass to geoloc and we're in buisness baby
                }
              });
					/*$.ajax('http://localhost:3000/endpoint', {
					        type: 'POST',
					        data: JSON.stringify(data),
					        contentType: 'application/json',
					        success: function() { console.log('success');},
					        error  : function() { console.log('error');}
					});*/
    });
});
