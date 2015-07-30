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