angular.module('app')
	.controller('googleMapCtrl', ['$scope', function($scope){

		var map;
		$scope.gMap = map;
		var infoWindow;
		var markerList = $scope.markerList ;
		
		var photos
		$scope.gPhoto = photos;
		var request;
		var service;
		var markers = [];
		$scope.map = map
		// console.log(markers)

		function initialize () {
			var center = new google.maps.LatLng(53.459722,-6.218056);
			map = new google.maps.Map(document.getElementById('map'),{
				center: center,
				zoom:12
			});

			var defaultBounds = new google.maps.LatLngBounds(
				new google.maps.LatLng(),
				new google.maps.LatLng());
				// -33.8902, 151.1759
				// -33.8474, 151.2631
			var option = {
				bounds: defaultBounds,
				types: ['(cities)']
			};

			var input = document.getElementById('pac-input');
			map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

			var autocomplete = new google.maps.places.Autocomplete(input, option)	;

			var request = {
				location: center,
				radius: 8047,
				types: ['restaurant' ]
			};	




			infowindow = new google.maps.InfoWindow();

			
			var service = new google.maps.places.PlacesService(map);

			service.nearbySearch(request, callback);

		}




		function callback(results, stattus) {
			if(stattus == google.maps.places.PlacesServiceStatus.OK) {
				for (var i=0; i < results.length; i++) {
					var place = results[i]
					createMarker(results[i]);
				}
			}
		}
		// $scope.markerCreation =
		 function createMarker(place) {
			var placeLoc = place.geometry.location;
			 photos = place.photos;
			 // console.log(photos);
			if (!photos) {
				return;

				// $scope.googlePhoto = place.photo;
				// console.log($scope.googlePhoto);
			}
			
			var marker = new google.maps.Marker({
				map: map,
				position: place.geometry.location
				// titile: place.name,
				// icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
			
			});
			$scope.photoList = photos;
			$scope.markerList = place.photos[0];
			 console.log($scope.markerList);
			

			google.maps.event.addListener(marker, 'click', function(){

				infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
                'Place ID: ' + place.place_id + '<br>' +
                 '<img src='+ place.photos[0].getUrl({'maxWidth': 175, 'maxHeight': 175}) +'>' + '<br>' + 'Rating:' + place.rating + '<img src='+ place.photos +'>' + '</div>');
				infowindow.open(map,this);
				console.log(infowindow);
				
			})
		}

		
		google.maps.event.addDomListener(window, 'load', initialize);

	}])
















	// var mapOptions = {
	// 	    center: new google.maps.LatLng(53.3603142,-6.3150542000000005),
	// 	    zoom: 12,
	// 	    mapTypeId: google.maps.MapTypeId.ROADMAP
	// 	};

	// 	var map = new google.maps.Map(document.getElementById('map'), mapOptions);
	// 	var acOptions = {
			

	// 	  	types: ['establishment']
	// 	};

	// 	var request = {
	// 		location: mapOptions.center,
	// 		radius: 8047,
	// 		types: ['cafe']
	// 	};

	// 	var service = new google.maps.places.PlacesService(map);


		
	// 	var autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'),acOptions);
	// 	autocomplete.bindTo('bounds',map);
	// 	var infoWindow = new google.maps.InfoWindow();
	// 	var marker = new google.maps.Marker({
	// 	  map: map
	// 	});

	// 	google.maps.event.addListener(autocomplete, 'place_changed', function() {
	// 	  infoWindow.close();
	// 	  var place = autocomplete.getPlace();
	// 	  if (place.geometry.viewport) {
	// 	    map.fitBounds(place.geometry.viewport);
	// 	  } else {
	// 	    map.setCenter(place.geometry.location);
	// 	    map.setZoom(17);
	// 	  }
	// 	  marker.setPosition(place.geometry.location);
	// 	  infoWindow.setContent('<div><strong>' + place.name + '</strong><br>');
	// 	  infoWindow.open(map, marker);
	// 	  google.maps.event.addListener(marker,'click',function(e){

	// 	    infoWindow.open(map, marker);

	// 	  });
	// 	});