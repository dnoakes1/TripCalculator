// Add a map search bar and route info
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById("map"), {
      center: { lat: 47.120882, lng: -101.300775},
      zoom: 13,
      mapTypeId: "roadmap",
    });
    // Create the search box and link it to the UI element.
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });
    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
  
      if (places.length == 0) {
        return;
      }
      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];
      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();
      places.forEach((place) => {
        if (!place.geometry) {
          console.log("Returned place contains no geometry");
          return;
        }
        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
  
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
    const directionsService = new google.maps.DirectionsService();
const directionsRenderer = new google.maps.DirectionsRenderer({
    draggable: true,
    map,
    panel: document.getElementById("right-panel"),
});
directionsRenderer.addListener("directions_changed", () => {
    computeTotalDistance(directionsRenderer.getDirections());
});
displayRoute(
    "Toronto, ON",
    "Vancouver, BC",
    directionsService,
    directionsRenderer
);
}

function displayRoute(origin, destination, service, display) {
service.route(
    {
    origin: origin,
    destination: destination,
    waypoints: [
        { location: "Winnipeg, MB" },
        { location: "Calgary, AB" },
    ],
    travelMode: google.maps.TravelMode.DRIVING,
    avoidTolls: true,
    },
    (result, status) => {
    if (status === "OK") {
        display.setDirections(result);
    } else {
        alert("Could not display directions due to: " + status);
    }
    }
);
}

function computeTotalDistance(result) {
let total = 0;
const myroute = result.routes[0];

for (let i = 0; i < myroute.legs.length; i++) {
    total += myroute.legs[i].distance.value;
}
total = total / 1000;
document.getElementById("total").innerHTML = total + " km";
}

// Initiate Map
function initMap() {
const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: {lat: 47.120882, lng: -101.300775},
});

// const directionsService = new google.maps.DirectionsService();
// const directionsRenderer = new google.maps.DirectionsRenderer({
//     draggable: true,
//     map,
//     panel: document.getElementById("right-panel"),
// });
// directionsRenderer.addListener("directions_changed", () => {
//     computeTotalDistance(directionsRenderer.getDirections());
// });
// displayRoute(
//     "Toronto, ON",
//     "Vancouver, BC",
//     directionsService,
//     directionsRenderer
// );
// }

// function displayRoute(origin, destination, service, display) {
// service.route(
//     {
//     origin: origin,
//     destination: destination,
//     waypoints: [
//         { location: "Winnipeg, MB" },
//         { location: "Calgary, AB" },
//     ],
//     travelMode: google.maps.TravelMode.DRIVING,
//     avoidTolls: true,
//     },
//     (result, status) => {
//     if (status === "OK") {
//         display.setDirections(result);
//     } else {
//         alert("Could not display directions due to: " + status);
//     }
//     }
// );
// }

// function computeTotalDistance(result) {
// let total = 0;
// const myroute = result.routes[0];

// for (let i = 0; i < myroute.legs.length; i++) {
//     total += myroute.legs[i].distance.value;
// }
// total = total / 1000;
// document.getElementById("total").innerHTML = total + " km";
// }


// Calculate fuel cost

function calculate()
{
    num1 = document.getElementById("MPG").value;
    num2 = document.getElementById("DriveDist").value;
    num3 = document.getElementById("FuelCost").value
    num4 = ((num1/100) * num2) * num3

    document.getElementById("result").innerHTML = "It will cost $" + num4.toFixed(2) + " to drive " + num2 + "km";
    document.getElementById("Dist").innerHTML = num2;
    document.getElementById("result").innerHTML;
}
}
