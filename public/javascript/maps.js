var map;
var marker;


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

	var addressInput = $('#map-search').val();

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
            console.log('select_link clicked');


						var data = {};
            data.searchZip = '23505';

                    //something is wrong with var here

           $.ajax({
  						type: 'GET',
  						data: data,
  				    contentType: 'application/json',
              url: 'http://localhost:5000/games/endpoint',
              success: function(response) {
									response.games.forEach(function(game){
										console.log(game.location.coordinates);
									})
                  //manipulate info here, pass to geoloc and we're in buisness baby
                }
              });
		
    });
});

//one big ajax request -> sends request to back end to find games,
// then update map data
