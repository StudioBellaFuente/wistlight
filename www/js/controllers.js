angular.module('wistlight.controllers', [])

.controller('MapCtrl', function MapCtrl($scope, $http) {

	   //here's some contrived controller method to demo updating the property.
	   $scope.getParking = function() {
		   $http.jsonp('http://customers.dynamic-designer.com/wistlight/get/1620').
		    success(function(data, status, headers, config) {
		      // this callback will be called asynchronously
		      // when the response is available
		    	$scope.pointFromController = data;
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    	console.log(status);
		    });
	   }
	   
	   $scope.setParking = function() {
		   if (navigator.geolocation) {
               navigator.geolocation.getCurrentPosition($scope.setPosition, $scope.showError);
           }
           else {
        	   console.log("Geolocation is not supported by this browser.");
           }
	   }
	   
	   $scope.setPosition = function (position) {

		   var lat  = position.coords.latitude
           var long = position.coords.longitude
           
           $scope.$apply();
           
		   //send to server
		   var url = 'http://customers.dynamic-designer.com/wistlight/set/'+lat+'/'+long+'/1620';
           $http.jsonp(url).
		    success(function(data, status, headers, config) {
		    	
		    	//center to new position
		    	$scope.pointFromController = position.coords;
		    	
		    	var element = document.getElementById('geolocation');
		           element.innerHTML = 'Latitude: '  + lat      + '<br />' +
		               'Longitude: ' + long     + '<br />' +
		               'Timestamp: ' + position.timestamp + '<br />' +
		           '<hr />'      + element.innerHTML;
		    }).
		    error(function(data, status, headers, config) {
		      // called asynchronously if an error occurs
		      // or server returns response with an error status.
		    	console.log (status);
		    });
       }
	   
	   $scope.showError = function (error) {
           switch (error.code) {
               case error.PERMISSION_DENIED:
                   $scope.error = "User denied the request for Geolocation."
                   break;
               case error.POSITION_UNAVAILABLE:
                   $scope.error = "Location information is unavailable."
                   break;
               case error.TIMEOUT:
                   $scope.error = "The request to get user location timed out."
                   break;
               case error.UNKNOWN_ERROR:
                   $scope.error = "An unknown error occurred."
                   break;
           }
           
           console.log($scope.error)
           $scope.$apply();
       }
	})
;