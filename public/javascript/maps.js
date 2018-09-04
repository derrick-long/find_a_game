var map;
var marker;
var addressInput = $('#map-search').val();

function initMap() {

	var mapOptions = {
		center: new google.maps.LatLng(40.680898,-8.684059),
		zoom: 11,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	map = new google.maps.Map(document.getElementById("map"), mapOptions);

}


//make an if statement only if my hidden attribs show
function createMarker(latlng) {
// watch for weird interaction with map center here
  if(marker != undefined && marker != ''){
    marker.setMap(null);
    marker = '';
  }

  marker = new google.maps.Marker({
    map: map,
    position: latlng
  });
}

function geocodeAddress() {

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;
			//clean up later
      map = new google.maps.Map(document.getElementById("map"));
      map.setCenter(myResult);

      map.setZoom(15);
		}
  });
}

$(function(){
      $('#submit').click(function(e){
            e.preventDefault();

						var data = {};
						data.searchZip = addressInput
						data.radius = $('#radius').val();
						geocodeAddress();

           $.ajax({
  						type: 'GET',
  						data: data,
  				    contentType: 'application/json',
              url: 'http://localhost:5000/games/endpoint',
              success: function(response) {
									response.games.forEach(function(game){
										console.log(game.location.coordinates);
										// add code for empty response, also add in rest of marker logic

									})
                  //manipulate info here, pass to geoloc and we're in buisness baby
                },
							error: function(XMLHttpRequest, textStatus, errorThrown) {
     						console.log(errorThrown);
  							}
            });

    	});
});

//one big ajax request -> sends request to back end to find games,
// then update map data
