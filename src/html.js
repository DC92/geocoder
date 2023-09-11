import {
  VARS,
  TARGET_TYPE
} from '../konstants';

import {
  createElement
} from './helpers/dom';

const klasses = VARS.cssClasses;

/**
 * @class Html
 */
export default class Html {
  /**
   * @constructor
   * @param {object} options Options.
   */
  constructor(options) {
    this.options = options;
    this.els = this.createControl();
  }

  createControl() {
    let container,
      containerClass,
      elements;

    if (this.options.targetType === TARGET_TYPE.INPUT) {
      containerClass = `${klasses.namespace} ${klasses.inputText.container}`;
      container = createElement(
        ['div', {
          id: VARS.containerId,
          classname: containerClass
        }],
        Html.input
      );
      elements = {
        container,
        control: container.querySelector(`.${klasses.inputText.control}`),
        label: container.querySelector(`.${klasses.inputText.label}`),
        input: container.querySelector(`.${klasses.inputText.input}`),
        search: container.querySelector(`.${klasses.inputText.search}`),
        result: container.querySelector(`.${klasses.inputText.result}`),
      };
      elements.label.innerHTML = this.options.label;
    } else {
      containerClass = `${klasses.namespace} ${klasses.glass.container}`;
      container = createElement(
        ['div', {
          id: VARS.containerId,
          classname: containerClass
        }],
        Html.glass
      );
      elements = {
        container,
        control: container.querySelector(`.${klasses.glass.control}`),
        button: container.querySelector(`.${klasses.glass.button}`),
        input: container.querySelector(`.${klasses.glass.input}`),
        search: container.querySelector(`.${klasses.glass.search}`),
        result: container.querySelector(`.${klasses.glass.result}`),
      };
    }

    // set placeholder from options
    elements.input.placeholder = this.options.placeholder;

    return elements;
  }
}

Html.glass = `
  <div class="${klasses.glass.control} ${klasses.olControl}">
    <button type="button" id="${VARS.buttonControlId}" class="${klasses.glass.button}"></button>
    <input type="text" id="${VARS.inputQueryId}" class="${klasses.glass.input}" autocomplete="off" placeholder="Search ...">
    <a id="${VARS.inputSearchId}" class="${klasses.glass.search} ${klasses.hidden}"></a>
  </div>
  <ul class="${klasses.glass.result}"></ul>
`;

Html.input = `
  <div class="${klasses.inputText.control}">
    <label type="button" id="${VARS.inputSearchId}" class="${klasses.inputText.label}"></label>
    <input type="text" id="${VARS.inputQueryId}" class="${klasses.inputText.input}" autocomplete="off" placeholder="SeaAAAAArch ...">
    <span class="${klasses.inputText.icon}"></span>
    <button type="button" id="${VARS.inputSearchId}" class="${klasses.inputText.search} ${klasses.hidden}"></button>
  </div>
  <ul class="${klasses.inputText.result}"></ul>
`;