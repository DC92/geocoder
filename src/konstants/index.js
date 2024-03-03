import * as _VARS_ from './vars.json';

export const VARS = _VARS_;

export const EVENT_TYPE = {
  ADDRESSCHOSEN: 'addresschosen',
};

export const CONTROL_TYPE = {
  NOMINATIM: 'nominatim',
  REVERSE: 'reverse',
};

export const TARGET_TYPE = {
  GLASS: 'glass-button',
  INPUT: 'text-input',
};

export const PROVIDERS = {
  OSM: 'osm',
  MAPQUEST: 'mapquest',
  PHOTON: 'photon',
  BING: 'bing',
  OPENCAGE: 'opencage',
};

export const DEFAULT_OPTIONS = {
  provider: PROVIDERS.OSM,
  label: '',
  placeholder: 'Search for an address',
  featureStyle: null,
  targetType: TARGET_TYPE.GLASS,
  lang: 'en-US',
  limit: 5,
  keepOpen: false,
  preventDefault: false,
  preventPanning: false,
  preventMarker: false,
  defaultFlyResolution: 10, // Meters per pixel
  debug: false,
};