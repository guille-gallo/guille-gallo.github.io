/////////////////////////////////////////////////////////////////////////////////////////////
////////// CON ESTA FORMA PODEMOS MOSTRAR UN RECORRIDO PASANDO POR VARIOS PUNTOS.//////////
/////////////////////////////////////////////////////////////////////////////////////////////
      var displayDirection = function (currentPosition, map) {
        var items = ['-32.951154, -60.650885', '-32.947413, -60.654120', '-32.944960, -60.643578'];
        var waypoints = [];
        for (var i = 0; i < items.length; i++) {
            var address = items[i];
            if (address !== "") {
                waypoints.push({
                    location: address,
                    stopover: true
                });
            }
        }         
          var directionsDisplay = new google.maps.DirectionsRenderer();
          var directionsService = new google.maps.DirectionsService();
          //var gomeria = destinations[i];
          var request = {
            origin:currentPosition,
            waypoints: waypoints,
            optimizeWaypoints: false, //en true muestra el más cercano primero.
            destination:'-32.951154, -60.650885',
            travelMode: google.maps.TravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
            console.log(status);
            if (status == google.maps.DirectionsStatus.OK) {
              directionsDisplay.setDirections(response);
              directionsDisplay.setMap(map);
            }
          });
      }
/////////////////////////////////////////////////////////////////////////////////////////////