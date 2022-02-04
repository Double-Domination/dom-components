import './car-control.scss';

import { DOMFactory } from '../../models/dom-factory';

import ColorPickerView from '../color-picker/color-picker';
import { create } from 'nouislider';

export type ICarControlViewInit = {
  inputId: string;
  actionBtn: string;
};

/**
 *  Builds car control
 */
export default class CarControlView extends DOMFactory {
  public formElement: DOMFactory;

  constructor(init: ICarControlViewInit) {
    super({
      className: 'car-ceation-control',
    });

    this.formElement = new DOMFactory({
      tagName: 'form',
      className: 'car-creation-control__form',
      // nodeContent: 'form',
    });
    this.formElement.domNode.setAttribute('method', 'POST');
    this.formElement.domNode.setAttribute('name', init.inputId);
    this.formElement.renderElement(this.domNode);

    // event listener
    this.formElement.domNode.addEventListener('submit', (evt) => {
      this.onSubmitHandler(evt);
    });

    const labelElement = new DOMFactory({
      tagName: 'label',
      // nodeContent: 'ff',
    });
    labelElement.renderElement(this.formElement.domNode);

    // input field
    const inputElement = new DOMFactory({
      tagName: 'input',
      className: 'car-creation-control__input',
    });
    inputElement?.domNode.setAttribute('type', 'text');
    inputElement?.domNode.setAttribute('name', init.inputId);
    inputElement?.domNode.setAttribute('id', init.inputId);
    inputElement?.domNode.setAttribute('placeholder', init.inputId);
    inputElement.renderElement(labelElement.domNode);

    // color selector
    const colorSelectorElement = new ColorPickerView({
      colorPickerId: `${init.inputId}-colsel`,
    });
    colorSelectorElement.renderElement(this.formElement.domNode);

    // Action button
    const actionButton = new DOMFactory({
      tagName: 'button',
      className: 'car-ceation-control__action-btn',
      nodeContent: `${init.actionBtn}`,
    });
    actionButton.domNode.setAttribute('type', 'submit');
    actionButton.renderElement(this.formElement.domNode);
  }

  onSubmitHandler(evt: Event) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
    const elements = (this.formElement.domNode as HTMLFormElement)
      .elements as any;
    console.log(elements[0].value);
    console.log(elements[2].value);
    // return false;
  }
}
