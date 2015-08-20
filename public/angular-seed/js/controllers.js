var pincheGomaAppControllers = angular.module('pincheGomaAppControllers', []);

pincheGomaAppControllers.controller('MainCtrl', function ($scope, $http, $location) {
	
	if(navigator.geolocation) {
		navigator.geolocation.getAccurateCurrentPosition = function (geolocationSuccess, geolocationError, geoprogress, options) {
		    var watchID,
		        timerID;

		    options = options || {};
			var checkLocation = function (position) {
				console.log("checkLocation");
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

				//SHIT
				map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
				currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
				
				getDistance(currentPosition);
			}
			watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
	    	timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop

	//------------------------------------------------------------------------------------------------------------------------------------------
	//      GEOLOCATION FUNCTIONS:
	//------------------------------------------------------------------------------------------------------------------------------------------
			// aparentemente esto se ejecuta al retornar la primer ubicación o cuando ya no va a intenar más obtener una ubicación.
			var stopTrying = function () {
			  navigator.geolocation.clearWatch(watchID);
			  //foundPosition(lastCheckedPosition);
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
		}
		
		$scope.select = {};
		$scope.select.blocks = [
			{'name': 'Cant. de cuadras dispuesto a caminar:', 'value': ''},
			{'name': '2', 'value': '2'},
			{'name': '4', 'value': '4'},
			{'name': '6', 'value': '6'},
			{'name': '10', 'value': '10'},
			{'name': '15', 'value': '15'},
			{'name': '30', 'value': '30'}
		];
		//Setting first option as selected in configuration select
		$scope.select.block = $scope.select.blocks[0].value;

		var getDistance = function (currentPosition) {
		// Simple GET request example :
		 $http.get('data/gomerias.json').
			 then(function(response) {
			 // this callback will be called asynchronously when the response is available
			 var data = response.data;
			 getCoordinates(data, currentPosition);
			 }, function(response) {
			 // called asynchronously if an error occurs or server returns response with an error status. 
		 });

	      /*$http.get( "data/gomerias.json", function( data ) {
	        getCoordinates(data, currentPosition);
	      });*/

	      var getCoordinates = function (data, currentPosition) {
	        var coordinates = [];
	        for (var i = 0; i < data.length; i++) {
	          coordinates.push({
	              LatLng: data[i].coordinates,
	              id: data[i].id,
	              name: data[i].name,
	          });
	        }
	        displayDirection(currentPosition, coordinates);
	      }

	        var displayDirection = function (currentPosition, coordinates) {
		      var directionsDisplay = new google.maps.DirectionsRenderer();
		      var directionsService = new google.maps.DirectionsService();
		      
		      calculateDistances(coordinates);
		      
		      function calculateDistances(coordinates) {
		        var currentCoordinates = [];
		        for (var i = 0; i < coordinates.length; i++) {
		          currentCoordinates[i] = coordinates[i].LatLng;
		        }

		        var service = new google.maps.DistanceMatrixService();
		        service.getDistanceMatrix(
		          {
		            origins: [currentPosition],
		            destinations: currentCoordinates,
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
		            var destinations = response.destinationAddresses;
		            var distances = [];

		            for (var i = 0; i <  response.rows.length; i++) {
		              var results = response.rows[i].elements;
		               for (var j = 0; j < results.length; j++) {
		                distances[j] = results[j].distance.value;
		                coordinates[j].distance = distances[j];
		                coordinates[j].address = destinations[j];
		              }
		            }
		            sayCoordinates(coordinates);
		        }
		      }

		      // This is because we need to know the coordinates for displaying the way.
		      var sayCoordinates = function (coordinates) {
		        return coordinates;
		      }

		      $('#blocksSelection').change(function() {
		        outputDiv.innerHTML = ''; 
		        var userBlocksQtySelection = $('#blocksSelection').find(":selected").text();
		        var meterSelection = (userBlocksQtySelection * 100);
		        makeWays(meterSelection);
		      });

		      var makeWays = function (meterSelection) {
		        console.log("makeWays");
		        var destinationOptions = [];

		        function compare(a,b) {
		          if (a.distance < b.distance)
		            return -1;
		          if (a.distance > b.distance)
		            return 1;
		          return 0;
		        }
		        coordinates = coordinates.sort(compare);

		        for (var i = 0; i < coordinates.length; i++) {
		        console.log("inside first for loop");          
		          if(coordinates[i].distance <= meterSelection) {
		            
		            console.log("selección: " + meterSelection);
		            console.log("dest. distance " + coordinates[i].distance);
		            
		            outputDiv.innerHTML += 
		            '<a id="gomeriaLink">' + 'Gomería: ' + coordinates[i].name + '</a>' 
		            + '</br>' +'Dirección: ' + coordinates[i].address 
		            + '</br>' + 'Distancia: ' + (coordinates[i].distance) 
		            + ' metros apróx.' 
		            + '</br>' 
		            + '--------------' 
		            + '</br>';

		            displayWay(currentPosition, coordinates);

		          } else{
		            console.log("no matches");
		          }
		        }
		      };

		      var displayWay = function () {
		        for (var i = 0; i < coordinates.length; i++) {  
		          var request = {
		            origin: currentPosition,
		            destination:coordinates[i].LatLng,
		            travelMode: google.maps.TravelMode.WALKING
		          };
		          directionsService.route(request, function(response, status) {
		            if (status == google.maps.DirectionsStatus.OK) {
		              directionsDisplay.setDirections(response);
		              directionsDisplay.setMap(map);
		            }
		          });
		          break;
		        }
		      }
		    }
	    };

		navigator.geolocation.getAccurateCurrentPosition({maxWait:15000});
	}
//------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------------------------------------------------
});