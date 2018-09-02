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

      createMarker(myResult);
      map.setCenter(myResult);

      map.setZoom(17);
		}
  });
}
//one big ajax request -> sends request to back end to find games,
// then update map data
