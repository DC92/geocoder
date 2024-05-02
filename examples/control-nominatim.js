/* global window, document, ol, Geocoder, URLSearchParams */

const olview = new ol.View({
  center: [0, 0],
  zoom: 3,
  minZoom: 2,
  maxZoom: 20,
});

const baseLayer = new ol.layer.Tile({
  source: new ol.source.OSM(),
});

const map = new ol.Map({
  target: document.querySelector('#map'),
  view: olview,
  layers: [baseLayer],
});

const popup = new ol.Overlay.Popup();

const params = new URLSearchParams(window.location.search);

// Instantiate with some options and add the Control
const geocoder = new Geocoder('nominatim', {
  provider: params.get('provider') || 'osm',
  targetType: params.get('target-type') || 'text-input',
  lang: 'en',
  label: 'Find a location by name',
  placeholder: 'Search for ...',
  limit: 5,
  keepOpen: false,
});

map.addControl(geocoder);
map.addOverlay(popup);

// Listen when an address is chosen
geocoder.on('addresschosen', (evt) => {
  window.setTimeout(() => {
    popup.show(evt.coordinate, evt.address.formatted);
  }, 3000);
});

// Set the select to the selected value
document.getElementsByName('provider')[0].value = params.get('provider');
document.getElementsByName('target-type')[0].value = params.get('target-type');