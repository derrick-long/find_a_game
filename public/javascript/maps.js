var map;
var markers = [];
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
function addMarker(props){
  var marker = new google.maps.Marker({
  position:props.coords,
  map:map,
	});
}

function geocodeAddress(markers) {

	var geocoder = new google.maps.Geocoder();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;
	// 		//clean up later
      map = new google.maps.Map(document.getElementById("map"));

			//works fine like this, now we just need to iterate and create the shit
			// Loop through markers


			map.setCenter(myResult);

			map.setZoom(10);

			for(var i = 0;i < markers.length;i++){
				// Add marker
				addMarker(markers[i]);
			}
			//make scale to radius later
		}
  });
}


$(function(){
      $('#submit').click(function(e){


            e.preventDefault();
						var data = {};
						data.searchZip = addressInput
						data.radius = $('#radius').val();



           $.ajax({
  						type: 'GET',
  						data: data,
  				    contentType: 'application/json',
              url: 'http://localhost:5000/games/endpoint',
              success: function(response) {
									response.games.forEach(function(game){
										var lat = game.location.coordinates[0];
										var lng = game.location.coordinates[1];
										var props = {}
										props.coords = {lat: lat, lng: lng};
										markers.push(props);

										// add code for empty response, also add in rest of marker logic

									})
                  //manipulate info here, pass to geoloc and we're in buisness baby
                },
							error: function(XMLHttpRequest, textStatus, errorThrown) {
     						console.log("Error");
  							}
            });

    	});

});

$(document).ajaxComplete(function( event, request, settings ) {
  geocodeAddress(markers);
});

// build an object, then iterate through it to create the markers I want
