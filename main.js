var random_places = [
  ['Moscow1', 55.822083, 37.665453, 4],
  ['Moscow2', 55.604697, 37.642107, 4],
  ['Lisbon1', 38.749402, -9.120034, 4],
  ['Lisbon2', 38.708960, -9.169130, 4],
  ['NewYork1', 40.784513, -73.976630, 4],
  ['NewYork2', 40.707522, -74.037055, 4],
  ['Bondi Beach', -33.890542, 151.274856, 4],
  ['Coogee Beach', -33.923036, 151.259052, 5],
  ['Cronulla Beach', -32.951132, -60.650876, 3],
  ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
  ['Maroubra Beach', -33.950198, 151.259302, 1]
];

var initialLocation;
var browserSupportFlag =  new Boolean();

function initialize() {

  var markers = [];
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true
  });
  
   if(navigator.geolocation) {

		navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {

    var lastCheckedPosition,
        locationEventCount = 0,
        watchID,
        timerID;

    options = options || {};

    var checkLocation = function (position) {
        lastCheckedPosition = position;
        locationEventCount = locationEventCount + 1;
        // We ignore the first event unless it's the only one received because some devices seem to send a cached
        // location even when maxaimumAge is set to zero
        
        console.log("desiredAccuracy: ", options.desiredAccuracy);
        document.write("desiredAccuracy: ", options.desiredAccuracy, " | ");

        if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
            
            console.log("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude )
            document.write("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude , " | " );
            
            clearTimeout(timerID);
            navigator.geolocation.clearWatch(watchID);
            foundPosition(position);
        } else {
            //geoprogress(position);
            console.log("checkLocation: ", position.coords.accuracy);
            document.write("checkLocation: ", position.coords.accuracy , " | ");
        }
    };

    var stopTrying = function () {
        navigator.geolocation.clearWatch(watchID);
        foundPosition(lastCheckedPosition);
    };

    var onError = function (error) {
        clearTimeout(timerID);
        navigator.geolocation.clearWatch(watchID);
        geolocationError(error);
    };

    var foundPosition = function (position) {
        console.log("foundPosition->accuracy ", position.coords.accuracy);
        document.write("foundPosition->accuracy ", position.coords.accuracy, " | ");

        //geolocationSuccess(position); 
        var pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude) ;
    	return givePos(pos);
        console.log("foundPosition: ", this);
    };

    if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
    if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
    if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

    options.maximumAge = 0; // Force current locations only
    options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

    watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
            
    console.log("el otro: ", this);

};
navigator.geolocation.getAccurateCurrentPosition({desiredAccuracy:20, maxWait:15000});
		

		var givePos = function (pos) {
			var pos = pos;
			return pos;
		};

		//var pos = new google.maps.LatLng(-32.9325566, -60.657553799999995);

		var infowindow = new google.maps.InfoWindow({
		map : map,
		position : this.pos,
		content : 'Found using geolocation'
		}) ;


	} else {
		// Error - Browser doesn't support Geolocation
		handleNoGeolocation(false) ;
	}
	function handleNoGeolocation(errorFlag) {
		if (errorFlag) {
			var content = 'Error: The Geolocation service failed.';
		}
		else {
			var content = 'Error: Your browser doesn\'t support geolocation.' ;
		}
		 
		var options = {
			map : map,
			position : new google.maps.LatLng(60, 105),
			content : content
		};
		 
		var infowindow = new google.maps.InfoWindow(options);
		map.setCenter(options.position);
	}

  // Show initial location at Sydney — can be changed to detect user location
  var defaultBounds = new google.maps.LatLngBounds(
      new google.maps.LatLng(-32.948674, -60.720103),
      new google.maps.LatLng(-32.953283, -60.626376)
    );
  map.fitBounds(defaultBounds);

	var input = (document.getElementById('pac-input'));

  	map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

	var searchBox = new google.maps.places.SearchBox(input, {
		bounds: defaultBounds // have to be defined first
	});

  	//[START region_getplaces]
  	// Listen for the event fired when the user selects an item from the
  	// pick list. Retrieve the matching places for that item.
	google.maps.event.addListener(searchBox, 'places_changed', function() {
		var places = searchBox.getPlaces();

		for (var i = 0, marker; marker = markers[i]; i++) {
			marker.setMap(null);
		}

		// For each place, get the icon, place name, and location.
		markers = [];
		var bounds = new google.maps.LatLngBounds();

		for (var i = 0, place; place = places[i]; i++) {
			var image = {
				url: place.icon,
				size: new google.maps.Size(71, 71),
				origin: new google.maps.Point(0, 0),
				anchor: new google.maps.Point(17, 34),
				scaledSize: new google.maps.Size(25, 25)
			};

			// Create a marker for each place.
			var marker = new google.maps.Marker({
				map: map,
				icon: image,
				title: place.name,
				position: place.geometry.location
			});

			markers.push(marker);

			bounds.extend(place.geometry.location);

			if (place.geometry.viewport) {
				map.fitBounds(place.geometry.viewport);
			} else {
				map.setCenter(place.geometry.location);
				map.setZoom(5);  // Why 17? Because it looks good.
			}
		}
	});
  	//[END region_getplaces]

  var place_markers = [];

  // Bias the SearchBox results towards places that are within the bounds of the
  // current map's viewport.
  // Make markers show if they are inside visible bounds
  google.maps.event.addListener(map, 'bounds_changed', function() {
      
    var bounds = map.getBounds();
    //searchBox.setBounds(bounds);
    
    // Remove out of bounds markers
    for (var k = 0; k < place_markers.length; k++) {
      var one_marker = place_markers[k];
      if (!bounds.contains(one_marker.getPosition())) {
        one_marker.setMap(null);
      }
    }

    // Create markers which should be visible
    for (var i = 0; i < random_places.length; i++) {
      var placeLatLng = random_places[i];
      
      var myLatLng = new google.maps.LatLng(placeLatLng[1], placeLatLng[2]);
      
      if ( bounds.contains(myLatLng) ) {        
        var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: placeLatLng[0],
        });
        place_markers.push(marker);
      }      
    };
    // end places markers
  });
}

google.maps.event.addDomListener(window, 'load', initialize);