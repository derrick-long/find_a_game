$(function(){
      $('#submit').click(function(e){
            e.preventDefault();
            console.log('select_link clicked');
            var data = {};
            data.searchZip = $('#map-search').val();

                    //something is wrong with var here

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

    });
});
