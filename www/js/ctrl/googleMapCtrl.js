angular.module('moduleControlles')
.controller("googleMapCtrl", function($scope,$state,$ionicPlatform,$ionicHistory,$stateParams,$ionicTabsDelegate,$sce,$ionicPopup,$ionicSideMenuDelegate,AppModules) {
   $scope.keyWord_map = [];
   
    var pyrmont = {lat: 13.168561, lng: 100.927903};
    var map = new google.maps.Map(document.getElementById('map2'), {
        center: pyrmont,
        zoom: 10,
    });
    $scope.back =function(){
        $state.go("detailNote");
    }
        var markers = [];
         var marker ="";
        var places ="";

        if(places==""){
            places = AppModules.individualOfcoordinatesPlace;
           var placeLoc = places.geometry.location;
            marker = new google.maps.Marker({
            draggable:true,
            map: map,
            position: places.geometry.location
          });
       
        }

          // Create the search box and link it to the UI element.
        var input = document.getElementById('pac-input');
        var searchBox = new google.maps.places.SearchBox(input);
        map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

        // Bias the SearchBox results towards current map's viewport.
        map.addListener('bounds_changed', function() {
          searchBox.setBounds(map.getBounds());
        });

       
        // Listen for the event fired when the user selects a prediction and retrieve
        // more details for that place.
        searchBox.addListener('places_changed', function() {
       /* marker.setMap(null);*/
          places = searchBox.getPlaces();

          if (places.length == 0) {
            return;
          }

          // Clear out the old markers.
          markers.forEach(function(marker) {
            marker.setMap(null);
          });
          markers = [];

          // For each place, get the icon, name and location.
          var bounds = new google.maps.LatLngBounds();
          places.forEach(function(place) {
            if (!place.geometry) {
              console.log("Returned place contains no geometry");
              return;
            }
    

            // Create a marker for each place.
            markers.push(new google.maps.Marker({
              map: map,
              position: place.geometry.location
            }));



            if (place.geometry.viewport) {
              // Only geocodes have viewport.
              bounds.union(place.geometry.viewport);
            } else {
              bounds.extend(place.geometry.location);
            }
          });
      
          map.fitBounds(bounds);
        });
      




});