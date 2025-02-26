/* global window, document, ol, Geocoder, console */

// Instantiate with photon, little button
const geocoderGlass = new Geocoder('nominatim');

// Instantiate with nominatim, outside of the map
const geocoderDirect = new Geocoder('nominatim', {
  provider: 'osm',
  targetType: 'text-input',
  lang: 'en',
  label: 'Direct fly to the first found',
  placeholder: 'Search in nominatim/OSM',
  limit: 1,
  keepOpen: false,
  target: document.body, // Attach this control out of the map
});

// Instantiate with nominatim, outside of the map
const geocoder = new Geocoder('nominatim', {
  provider: 'osm',
  targetType: 'text-input',
  lang: 'en',
  placeholder: 'Search in nominatim/OSM',
  limit: 5,
  keepOpen: false,
  target: document.body, // Attach this control out of the map
});

const popup = new ol.Overlay.Popup();

// Listen when an address is chosen
geocoder.on('addresschosen', (evt) => {
  window.setTimeout(() => {
    popup.show(evt.coordinate, evt.address.formatted);
  }, 1000);
});

new ol.Map({
  target: document.querySelector('#map'),
  view: new ol.View({
    center: [0, 0],
    zoom: 3,
  }),
  controls: [
    new ol.control.Zoom(),
    geocoderGlass,
    geocoderDirect,
    geocoder,
  ],
  layers: [
    new ol.layer.Tile({
      source: new ol.source.OSM(),
    }),
  ],
  overlays: [
    popup,
  ],
});

console.log('Openlayers ' + ol.util.VERSION);
console.log('Geocoder ' + geocoder.getVersion());