    google.maps.event.addDomListener(window, 'load', init);
    var map;
    function init() {
        var mapOptions = {
            center: new google.maps.LatLng(47.387860, 8.187727),
            zoom: 12,
            zoomControl: true,
            zoomControlOptions: {
                style: google.maps.ZoomControlStyle.DEFAULT,
            },
            disableDoubleClickZoom: true,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            },
            scaleControl: true,
            scrollwheel: false,
            panControl: true,
            streetViewControl: true,
            draggable : false,
            overviewMapControl: true,
            overviewMapControlOptions: {
                opened: false,
            },
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            styles: [
    {
        "featureType": "poi",
        "stylers": [
            { "visibility": "off" }
        ]
    },{
        "stylers": [
            { "saturation": -70 },
            { "lightness": 37 },
            { "gamma": 1.15 }
        ]
    },{
        "elementType": "labels",
        "stylers": [
            { "gamma": 0.26 },
            { "visibility": "off" }
        ]
    },{
        "featureType": "road",
        "stylers": [
            { "lightness": 0 },
            { "saturation": 0 },
            { "hue": "#ffffff" },
            { "gamma": 0 }
        ]
    },{
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "off" }
        ]
    },{
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            { "lightness": 20 }
        ]
    },{
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
            { "lightness": 50 },
            { "saturation": 0 },
            { "hue": "#ffffff" }
        ]
    },{
        "featureType": "administrative.province",
        "stylers": [
            { "visibility": "on" },
            { "lightness": -50 }
        ]
    },{
        "featureType": "administrative.province",
        "elementType": "labels.text.stroke",
        "stylers": [
            { "visibility": "off" }
        ]
    },{
        "featureType": "administrative.province",
        "elementType": "labels.text",
        "stylers": [
            { "lightness": 20 }
        ]
    }
],
        }
        var mapElement = document.getElementById('map');
        var map = new google.maps.Map(mapElement, mapOptions);
        var locations = [
	    ['Wedding Bells Church', '1 Infinite Loop<br />Cupertino, CA 95014', 'undefined', '', '', 47.387860, 8.187727, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png'],['After Party', '1 Infinite Loop<br />Cupertino, CA 95014', 'undefined', '', '', 40.6700,  -73.8400, 'https://mapbuildr.com/assets/img/markers/solid-pin-red.png']
        ];
        for (i = 0; i < locations.length; i++) {
            if (locations[i][1] =='undefined'){ description ='';} else { description = locations[i][1];}
            if (locations[i][2] =='undefined'){ telephone ='';} else { telephone = locations[i][2];}
            if (locations[i][3] =='undefined'){ email ='';} else { email = locations[i][3];}
           if (locations[i][4] =='undefined'){ web ='';} else { web = locations[i][4];}
           if (locations[i][7] =='undefined'){ markericon ='';} else { markericon = locations[i][7];}
            marker = new google.maps.Marker({
                icon: markericon,
                position: new google.maps.LatLng(locations[i][5], locations[i][6]),
                map: map,
                title: locations[i][0],
                desc: description,
                tel: telephone,
                email: email,
                web: web
            });
link = '';            bindInfoWindow(marker, map, locations[i][0], description, telephone, email, web, link);
     }
 function bindInfoWindow(marker, map, title, desc, telephone, email, web, link) {
      var infoWindowVisible = (function () {
              var currentlyVisible = false;
              return function (visible) {
                  if (visible !== undefined) {
                      currentlyVisible = visible;
                  }
                  return currentlyVisible;
               };
           }());
           iw = new google.maps.InfoWindow();
           google.maps.event.addListener(marker, 'click', function() {
               if (infoWindowVisible()) {
                   iw.close();
                   infoWindowVisible(false);
               } else {
                   var html= "<div style='color:#000;background-color:#fff;padding:5px;width:150px;'><h4>"+title+"</h4><p>"+desc+"<p></div>";
                   iw = new google.maps.InfoWindow({content:html});
                   iw.open(map,marker);
                   infoWindowVisible(true);
               }
        });
        google.maps.event.addListener(iw, 'closeclick', function () {
            infoWindowVisible(false);
        });
 }   var waypts = [];
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({
          suppressMarkers: true
      });
      if (locations.length > 1){
          for (var i = 0; i < locations.length; i++) {
              waypts.push({
                  location:new google.maps.LatLng(locations[i][5], locations[i][6]),
                  stopover:true
              });
          };
          var request = {
              origin: new google.maps.LatLng(locations[0][5], locations[0][6]),
              destination: new google.maps.LatLng(locations[locations.length - 1][5], locations[locations.length - 1][6]),
              waypoints: waypts,
              optimizeWaypoints: true,
              travelMode: google.maps.DirectionsTravelMode.DRIVING
          };
          directionsService.route(request, function(response, status) {
              if (status == google.maps.DirectionsStatus.OK) {
                  polylineOptions = {
                      strokeColor: '#808080',
                      strokeWeight: '1'
                  }
                  directionsDisplay.setOptions({
                      polylineOptions: polylineOptions
                  });
                  directionsDisplay.setDirections(response);
              }
          });
          directionsDisplay.setMap(map);
       }

}
