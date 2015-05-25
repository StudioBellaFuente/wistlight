// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('wistlight', ['ionic', 'wistlight.controllers'])


.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
    
  });
})

.directive('sap', function() {
    return {
        restrict: 'E',
        replace: true,
        template: '<div></div>',
        link: function(scope, element, attrs) {
            var map = L.map(attrs.id, {
                center: [51.0693855,13.7469725],
                zoom: 17
            });
            var marker;
            
            L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
                attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(map);

            // add a marker in the given location, attach some popup content to it and open the popup
            marker = L.marker([51.0693855,13.7469725]).addTo(map)
                .bindPopup('Das Zentrum.')
                .openPopup();

            function updatePoint(pt) {
            	if (pt){
            		map.removeLayer(marker);
            		marker = L.marker([pt.latitude, pt.longitude]).addTo(map)
            			.bindPopup('Hier.')
                    	.openPopup();
            		map.setView([pt.latitude, pt.longitude], 17);
            	}
            }

            //add a watch on the scope to update your points.
            // whatever scope property that is passed into
            // the poinsource="" attribute will now update the points
            scope.$watch(attrs.pointsource, function(value) {
               updatePoint(value);
            });
        }
    };
});