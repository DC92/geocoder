import Control from 'ol/control/Control';
import Style from 'ol/style/Style';
import Icon from 'ol/style/Icon';

import {
  CONTROL_TYPE,
  DEFAULT_OPTIONS,
} from './konstants';

import Html from './html';
import Nominatim from './nominatim';
import {
  assert,
} from './helpers/mix';

/**
 * @class Base
 * @extends {ol.control.Control}
 */
export default class Base extends Control {
  /**
   * @constructor
   * @param {string} type nominatim|reverse.
   * @param {object} options Options.
   */
  constructor(type = CONTROL_TYPE.NOMINATIM, opt) {
    assert(typeof type === 'string', '@param `type` should be string!');
    assert(
      type === CONTROL_TYPE.NOMINATIM || type === CONTROL_TYPE.REVERSE,
      `@param 'type' should be '${CONTROL_TYPE.NOMINATIM}'
      or '${CONTROL_TYPE.REVERSE}'!`
    );
    const options = {
      ...DEFAULT_OPTIONS,
      featureStyle: [
        new Style({
          image: new Icon({
            anchor: [0.5, 1],
            src: 'data:image/svg+xml;charset=utf-8,' +
              '<svg width="26" height="42" viewBox="0 0 26 42" xmlns="http://www.w3.org/2000/svg">' +
              '<polygon points="1,18 14,42 25,18" fill="rgb(75,75,75)" />' +
              '<ellipse cx="13" cy="13" rx="13" ry="13" fill="rgb(75,75,75)" />' +
              '<ellipse cx="13" cy="14" rx="6" ry="6" fill="yellow" />' +
              '</svg>',
          })
        }),
      ],
      ...opt,
    };

    let container;
    let $nominatim;
    const $html = new Html(options);

    if (type === CONTROL_TYPE.NOMINATIM) {
      container = $html.els.container;
    }

    super({
      element: container,
      ...options, // Allows to add ol.control.Control options (as target:)
    });

    if (!(this instanceof Base)) return new Base();

    this.options = options;
    this.container = container;

    if (type === CONTROL_TYPE.NOMINATIM) {
      $nominatim = new Nominatim(this, $html.els);
      this.layer = $nominatim.layer;
    }
  }

  /**
   * @return {ol.layer.Vector} Returns the layer created by this control
   */
  getLayer() {
    return this.layer;
  }

  /**
   * @return {ol.source.Vector} Returns the source created by this control
   */
  getSource() {
    return this.getLayer().getSource();
  }

  /**
   * Set a new provider
   * @param {String} provider
   */
  setProvider(provider) {
    this.options.provider = provider;
  }

  /**
   * Set provider key
   * @param {String} key
   */
  setProviderKey(key) {
    this.options.key = key;
  }

  /**
   * @return {String} Returns the version & build date
   */
  getVersion() {
    return '__buildVersion__ __buildDate__';
  }
}