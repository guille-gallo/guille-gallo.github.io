/*var random_places = [
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
];*/

var initialLocation;
var browserSupportFlag =  new Boolean();
var geocoder;
var bounds = new google.maps.LatLngBounds();
var map;

function initialize() {
  //map = new google.maps.Map(document.getElementById('map-canvas'));
  geocoder = new google.maps.Geocoder();
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

          //if ((position.coords.accuracy <= options.desiredAccuracy) && (locationEventCount > 1)) {
              var mapOptions = {
                zoom: 19,
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
              
              var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
              
              displayDirection(currentPosition, map);
              getDistance(currentPosition, map);
              
              /*clearTimeout(timerID);
              navigator.geolocation.clearWatch(watchID);*/
      };

      $('#blocksSelection').change(function() {
        console.log( "Handler for .change() called." );
        console.log($('#blocksSelection').find(":selected").text());
      });

      var displayDirection = function (currentPosition, map) {
        var items = ['-32.951154, -60.650885', '-32.947413, -60.654120', '-32.944960, -60.643578'];
       
        var directionsDisplay = new google.maps.DirectionsRenderer();
        var directionsService = new google.maps.DirectionsService();
        
        var request = {
          origin: currentPosition,
          destination:'-32.951154, -60.650885',
          travelMode: google.maps.TravelMode.WALKING
        };
        directionsService.route(request, function(response, status) {
          if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
            directionsDisplay.setMap(map);
          }
        });
      }

    var getDistance = function (currentPosition, map) {
      var markersArray = [];
      var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

      (function calculateDistances() {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [currentPosition],
            destinations: ['-32.951154, -60.650885'],
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
      })();
      function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var outputDiv = document.getElementById('outputDiv');
          outputDiv.innerHTML = '';
          deleteOverlays();

          for (var i = 0; i < origins.length; i++) {
            var results = response.rows[i].elements;
            //addMarker(origins[i], false);
            for (var j = 0; j < results.length; j++) {
              //addMarker(destinations[j], true);
              outputDiv.innerHTML += 'DESDE: ' + origins[i] + '</br>' + ' HASTA ' + destinations[j]
                  + '</br>' + 'DISTANCIA: ' + results[j].distance.text + '</br>' + ' TIEMPO: '
                  + results[j].duration.text + '<br>';
            }
          }
        }
      }
      function addMarker(location, isDestination) {
        var icon;
        if (isDestination) {
          icon = destinationIcon;
        } else {
          icon = originIcon;
        }
        geocoder.geocode({'address': location}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            bounds.extend(results[0].geometry.location);
            map.fitBounds(bounds);
            var marker = new google.maps.Marker({
              map: map,
              position: results[0].geometry.location,
              icon: icon
            });
            markersArray.push(marker);
          } else {
            alert('Geocode was not successful for the following reason: '
              + status);
          }
        });
      }
      function deleteOverlays() {
        for (var i = 0; i < markersArray.length; i++) {
          markersArray[i].setMap(null);
        }
        markersArray = [];
      }
    };

      // aparentemente esto se ejecuta al retornar la primer ubicación o cuando ya no va a intenar más obtener una ubicación.
      var stopTrying = function () {
          navigator.geolocation.clearWatch(watchID);
          foundPosition(lastCheckedPosition);
      };

      var onError = function (error) {
          clearTimeout(timerID);
          navigator.geolocation.clearWatch(watchID);
          geolocationError(error);
      };
      
      var geolocationError = function (error) {
        if (error.code === 1) {
          alert("Please enable your location service.");
        }
        else {
          alert("Error: Your browser doesn\'t support geolocation.");
        }        
      }

      if (!options.maxWait)            options.maxWait = 10000; // Default 10 seconds
      if (!options.desiredAccuracy)    options.desiredAccuracy = 20; // Default 20 meters
      if (!options.timeout)            options.timeout = options.maxWait; // Default to maxWait

      options.maximumAge = 0; // Force current locations only
      options.enableHighAccuracy = true; // Force high accuracy (otherwise, why are you using this function?)

      watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
      timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop
    };
    navigator.geolocation.getAccurateCurrentPosition({desiredAccuracy:20, maxWait:15000});
  }
}
google.maps.event.addDomListener(window, 'load', initialize);