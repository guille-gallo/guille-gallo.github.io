var pincheGomaAppControllers = angular.module('pincheGomaAppControllers', []);

pincheGomaAppControllers.controller('MainCtrl', function ($scope, $http, $location) {
	
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
			//GLOBAL HERE. FIX!!!!
			var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		}
		watchID = navigator.geolocation.watchPosition(checkLocation, onError, options);
    	timerID = setTimeout(stopTrying, options.maxWait); // Set a timeout that will abandon the location loop

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
	navigator.geolocation.getAccurateCurrentPosition({maxWait:15000});
});