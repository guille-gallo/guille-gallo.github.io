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
  /*var map = new google.maps.Map(document.getElementById('map-canvas'), {
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    panControl: true
  });*/
  
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
          
          /*console.log("desiredAccuracy: ", options.desiredAccuracy);
          document.write("desiredAccuracy: ", options.desiredAccuracy, " | ");*/

          //if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
              var mapOptions = {
                zoom: 6,
                center: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                mapTypeControlOptions: {
                  style: google.maps.MapTypeControlStyle.DEFAULT,
                  mapTypeIds: [
                    google.maps.MapTypeId.ROADMAP,
                    google.maps.MapTypeId.TERRAIN
                  ]
                }
              };
              var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
              
              /*var defaultBounds = new google.maps.LatLngBounds(
                new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
              );
              map.fitBounds(defaultBounds);*/

              //console.log("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude )
              //document.write("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude , " | " );
              
              clearTimeout(timerID);
              navigator.geolocation.clearWatch(watchID);
              //foundPosition(position);
          //}// else {
              //geoprogress(position);
              /*console.log("checkLocation: ", position.coords.accuracy);
              document.write("checkLocation: ", position.coords.accuracy , " | ");*/
          //}
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
        //console.log("foundPosition->accuracy ", position.coords.accuracy);
        /*document.write("foundPosition->accuracy ", position.coords.accuracy, " | ");
        document.write("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude , " | " );*/

        //console.log("current position: ", "current latitude: " , position.coords.latitude , " | ", "current longitude: ", position.coords.longitude , " | " );
        //geolocationSuccess(position); 
      };

      if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
      if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
      if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

      options.maximumAge = 0; // Force current locations only
      options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

      watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
      timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
    };
    navigator.geolocation.getAccurateCurrentPosition({desiredAccuracy:20, maxWait:15000});
  	
    /*function handleNoGeolocation(errorFlag) {
      
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
    }*/
  }
}
google.maps.event.addDomListener(window, 'load', initialize);