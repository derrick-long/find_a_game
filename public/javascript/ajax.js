$(function(){
      $('#select_link').click(function(e){
            e.preventDefault();
            console.log('select_link clicked');

                     /*$.ajax({
                        dataType: 'jsonp',
                        data: "data=yeah",
                        jsonp: 'callback',
                        url: 'http://localhost:3000/endpoint?callback=?',
                        success: function(data) {
                            console.log('success');
                            console.log(JSON.stringify(data));
                        }
                    });*/
					 var data = {name:"Wut"};
           $.ajax({
  						type: 'GET',
  						data: data,
  				    contentType: 'application/json',
              url: 'http://localhost:5000/endpoint',
              success: function(response) {
                  console.log(response.user.firstName);
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
