import './color-picker.scss';
import rawHTML from './color-picker.html';

import HtmlTemplateConverter from '../../models/html-template-converter';
import { DOMFactory } from '../../models/dom-factory';
// import { IDomWithStaticHtml } from '../../models/IWithStaticHtml';
// import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

export type IColorPickerViewInit = {
  colorPickerId: string;
  // filterStateContainer: string;
};

/**
 *  Builds  colorpicker
 */
export default class ColorPickerView extends DOMFactory {
  private template = HtmlTemplateConverter(rawHTML) as HTMLElement;

  colorPickerElement: HTMLInputElement;

  private defaultColor = '#0000ff';

  constructor(init: IColorPickerViewInit) {
    super({
      className: 'color-picker',
      tagName: 'button',
    });

    this.domNode.replaceChildren(this.template);

    this.colorPickerElement = this.domNode.querySelector(
      '[type="color"]'
    ) as HTMLInputElement;

    // atributes initialization
    this.colorPickerElement.setAttribute('name', init.colorPickerId);
    this.colorPickerElement.setAttribute('title', init.colorPickerId);
    this.colorPickerElement.setAttribute('id', init.colorPickerId);

    this.colorPickerElement.value = this.defaultColor;
    this.colorPickerElement.addEventListener(
      'change',
      (evt: Event) => this.colorChangeHandler(evt),
      false
    );
    this.colorPickerElement.select();
  }

  // eslint-disable-next-line class-methods-use-this
  colorChangeHandler(event: Event) {
    console.log((event.target as HTMLInputElement).value);
    // return event.target.value as Event;
    return (event.target as HTMLInputElement).value;
  }
}
