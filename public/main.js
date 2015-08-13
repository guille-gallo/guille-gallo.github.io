var initialLocation;
var browserSupportFlag =  new Boolean();
var geocoder;
var bounds = new google.maps.LatLngBounds();
var map;

function initialize() {
  geocoder = new google.maps.Geocoder();

  if(navigator.geolocation) {
    
    navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {

      var watchID,
          timerID;

      options = options || {};

      var checkLocation = function (position) {
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
        getDistance(currentPosition, map);
      };
//------------------------------------------------------------------------------------------------------------------------------------------
//      GEOLOCATION FUNCTIONS:
//------------------------------------------------------------------------------------------------------------------------------------------
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
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
    var getDistance = function (currentPosition, map) {

      $.get( "gomerias.json", function( data ) {
        getCoordinates(data);
      });

      var getCoordinates = function (data) {
        var coordinates = [];
        for (var i = 0; i < data.length; i++) {
          coordinates[i] = data[i].coordinates;
        }  
        calculateDistances(coordinates);      
      }

      var destinationIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=D|FF0000|000000';
      var originIcon = 'https://chart.googleapis.com/chart?chst=d_map_pin_letter&chld=O|FFFF00|000000';

      function calculateDistances(coordinates) {
        var service = new google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [currentPosition],
            destinations: coordinates,
            travelMode: google.maps.TravelMode.WALKING,
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
          }, callback);
      }
      function callback(response, status) {
        if (status != google.maps.DistanceMatrixStatus.OK) {
          alert('Error was: ' + status);
        } else {
          var origins = response.originAddresses;
          var destinations = response.destinationAddresses;
          var outputDiv = document.getElementById('outputDiv');

          $('#blocksSelection').change(function() {
            outputDiv.innerHTML = ''; 

            for (var i = 0; i < origins.length; i++) {
              var results = response.rows[i].elements;

              for (var j = 0; j < results.length; j++) {
                var userBlocksQtySelection = $('#blocksSelection').find(":selected").text();
                var metersSelection = (userBlocksQtySelection * 100);

                if (results[j].distance.value <= metersSelection) {
                  outputDiv.innerHTML += 'DESDE: ' + origins[i] + '</br>' + ' HASTA: ' + destinations[j]
                    + '</br>' + 'DISTANCIA: ' + results[j].distance.text + '</br>' + ' TIEMPO: '
                    + results[j].duration.text + '<br>' + "-------------------------" + "</br>";
                } else {
                  console.log("no matches");
                }            
              };
            }
          });         
        }
      }
    };

    var displayDirection = function (currentPosition, map) {     
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

    navigator.geolocation.getAccurateCurrentPosition({maxWait:15000});
  }
}
google.maps.event.addDomListener(window, 'load', initialize);