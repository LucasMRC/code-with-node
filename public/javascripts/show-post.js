/* eslint-disable */

mapboxgl.accessToken = '<%= JSON.stringify(mapBoxToken) %>';

const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/light-v10',
    center: post.geometry.coordinates,
    zoom: 5,
});

// create a HTML element for our post location/marker
const el = document.createElement('div');
el.className = 'marker';

// make a marker for our location and add to the map
new mapboxgl.Marker(el)
    .setLngLat(post.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 }) // add popups
            .setHTML(`<h3>${post.title}</h3><p>${post.location}</p>`)
    )
    .addTo(map);

// Toggle edit review form

$('.toggle-edit-form').on('click', function() {
    console.log('clicked');
    $(this).text() === 'Edit' ? $(this).text('Cancel') : $(this).text('Edit');
    $(this)
        .siblings('.edit-review-form')
        .toggle();
});

// Add listener for clearing of rating for edit and new form

$('.clear-rating').click(function() {
    $(this)
        .siblings('.input-no-rate')
        .click();
});
