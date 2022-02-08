const image = "img/map_marker.svg";
const styles = [
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#d3d3d3"
            }
        ]
    },
    {
        "featureType": "transit",
        "stylers": [
            {
                "color": "#808080"
            },
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#b3b3b3"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ffffff"
            },
            {
                "weight": 1.8
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d7d7d7"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#ebebeb"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a7a7a7"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#efefef"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#696969"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#737373"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#d6d6d6"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {},
    {
        "featureType": "poi",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#dadada"
            }
        ]
    }
];

function initMap() {  

  const map = new google.maps.Map(document.getElementById("object_map"), {
    zoom: 16,
    center: {lat: 50.478209954172236, lng: 30.431968155699604},
    styles: styles
  });

  const flats = [
    [{ lat: 50.478209954172236, lng: 30.431968155699604 }, "Flat 1"],
    [{ lat: 50.477654, lng: 30.434942 }, "Flat 2"],
    [{ lat: 50.47925562715485, lng: 30.43558249317178 }, "Flat 3"],
    [{ lat: 50.47816480257362, lng: 30.432253434555196 }, "Flat 4"],
  ];

  const infoWindow = new google.maps.InfoWindow();

  flats.forEach(([position, title], i) => {
    const marker = new google.maps.Marker({
      position,
      map,
      // title: `${i + 1}. ${title}`,
      // label: `${i + 1}`,
      optimized: false,
      icon: image,
      styles: styles
    });

    marker.addListener("click", () => {
      infoWindow.close();
      infoWindow.setContent(marker.getTitle());
      infoWindow.open(marker.getMap(), marker);
    });
  });

}

function mapCreate(id, latval, lngval, z) {
    const map2 = new google.maps.Map(document.getElementById(id), {
        center: {lat: latval, lng: lngval},
        scrollwheel: false,
        scaleControl: false,
        zoom: z,
        styles: styles
    });
    const marker2 = new google.maps.Marker({
        map: map2,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: {lat: latval, lng: lngval},
        icon: image,
        title: ''
    });
}

function mapObject() {
    const image2 = "img/map_pin.svg";
    const map3 = new google.maps.Map(document.getElementById("locMap"), {
        center: {lat: 50.44889, lng: 30.494567},
        scrollwheel: false,
        scaleControl: false,
        zoom: 16,
        styles: styles
    });
    const marker3 = new google.maps.Marker({
        map: map3,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: {lat: 50.44889, lng: 30.494567},
        icon: image2,
        title: ''
    });
}

function mapAddObject() {
    const image2 = "img/map_pin.svg";
    const map3 = new google.maps.Map(document.getElementById("addObjMap"), {
        center: {lat: 50.44889, lng: 30.494567},
        scrollwheel: false,
        scaleControl: false,
        zoom: 16,
        styles: styles
    });
    const marker3 = new google.maps.Marker({
        map: map3,
        draggable: false,
        animation: google.maps.Animation.DROP,
        position: {lat: 50.44889, lng: 30.494567},
        icon: image2,
        title: ''
    });
}

window.addEventListener("load", function(){
    if($("#object_map").length > 0) {
        initMap();
    }
    if($("#locMap").length > 0) {
        mapObject();
    }
    if($("#addObjMap").length > 0) {
        mapAddObject();
    }
});