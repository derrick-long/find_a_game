var map;
var markers = [];
var addressInput;
var server = document.getElementById('serverInfo');



//get user location


function getAddress (latitude, longitude) {
  $.ajax('https://maps.googleapis.com/maps/api/geocode/json?' +
          'latlng=' + latitude + ',' + longitude + '&key=' +
          'AIzaSyDGdCjLNhY1u1ZQhXOHhVgTewhOyj71OuU')
  .then(
    function success (response) {
      console.log('User\'s Address Data is ', response);
    },
    function fail (status) {
      console.log('Request failed.  Returned status of',
                  status);
    }
  );

}




function ipLookUp () {
  $.ajax('https://ipapi.co/json')
  .then(
      function success(response) {
				 map = new google.maps.Map(document.getElementById("map"));
				 map.setCenter({lat:response.latitude,lng: response.longitude});
},

      function fail(data, status) {
          console.log('Request failed.  Returned status of',
                      status);
      }
  );
}

// break this up put in init map
// original


if ("geolocation" in navigator) {
  // check if geolocation is supported/enabled on current browser
  navigator.geolocation.getCurrentPosition(
   function success(position) {
     // for when getting location is a success
     console.log('latitude', position.coords.latitude,
                 'longitude', position.coords.longitude);
     getAddress(position.coords.latitude, position.coords.longitude);
   },
  function error(error_message) {
    // for when getting location results in an error
    console.error('An error has occured while retrieving' +
                  'location', error_message);
    ipLookUp();
  });
} else {
  // geolocation is not supported
  // get your location some other way
  console.log('geolocation is not enabled on this browser');
  ipLookUp();
}

// make this only fire after the above

function initMap() {
// basically go through and set up the center depending on outcome of function
	var mapOptions = {
		center: new google.maps.LatLng(10.20,40.38),
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
	addressInput = $('#map-search').val();

	geocoder.geocode({address: addressInput}, function(results, status) {

		if (status == google.maps.GeocoderStatus.OK) {

      var myResult = results[0].geometry.location;
	// 		//clean up later
      map = new google.maps.Map(document.getElementById("map"));

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

	 	addressInput = $('#map-search').val();
		e.preventDefault();
		var data = {};
		data.searchZip = addressInput
		data.radius = $('#radius').val();



   $.ajax({
			type: 'GET',
			data: data,
	    contentType: 'application/json',
      url: server.dataset.url,
      success: function(response) {
					// if (response.games == undefined || response.games.length == 0) {
					if(response.success){
						window.location.replace(response.redirectTo);
						//placeholder for now
					} else {
					response.games.forEach(function(game){
						var lat = game.location.coordinates[0];
						var lng = game.location.coordinates[1];
						var props = {}
						props.coords = {lat: lat, lng: lng};
						markers.push(props);

					})

				}

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
