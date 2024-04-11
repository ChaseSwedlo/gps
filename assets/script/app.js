'use strict';

const mapBox = document.getElementById('map');
let userLatitude = 40.758896;
let userLongitude = -73.985130;
let marker = '';
mapboxgl.accessToken = 'pk.eyJ1IjoiY2hhc2Vzd2VkbG8iLCJhIjoiY2x1cmlwenlmMDFzNjJxbW9jcjF4eHNreSJ9.vHG-jnm9uU-wInuQjToVQw';
const map = new mapboxgl.Map({
	container: 'map',
	style: 'mapbox://styles/mapbox/streets-v12',
	center: [userLongitude, userLatitude],
    zoom: 17,
    pitch: 55
});

function getLocation(position) {
    let { latitude, longitude } = position.coords;
    userLatitude = latitude;
    userLongitude = longitude;
    buildMap();
}

function errorHandler() {
    console.log('Unable to retrive your location')
}

const options = {
    enableHighAccuracy: true
}

function buildMap() {
    map.flyTo({
        center: [userLongitude, userLatitude],
        speed: 2, 
        curve: 1, 
        essential: true
    });
    marker = new mapboxgl.Marker({
        color: '#3b56ff',
        scale: 1.4
    })
    .setLngLat([userLongitude, userLatitude])
    .addTo(map);
}

if('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(
        getLocation, 
        errorHandler, 
        options
    )
}
else {
    console.log('GeoLocation is not supported by your browser');
}

function handleLocationUpdate(position) {
    const { latitude, longitude } = position.coords;
    marker.setLngLat([longitude, latitude]);
    map.panTo([longitude, latitude]);
}
function handleLocationError(error) {
    console.error('Error getting location:', error);
}
navigator.geolocation.watchPosition(handleLocationUpdate, handleLocationError, {
    enableHighAccuracy: true,
    timeout: 5000, 
    maximumAge: 0 
})