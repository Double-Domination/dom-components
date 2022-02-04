import './example.scss';

import { DOMFactory } from '../../models/dom-factory';


// you should pass initial data here
export type IExampleComponent = {
  exampleName: string;
  exampleSurename: string;
};

/**
 *  Builds table entry
 */
export default class ExampleComponent extends DOMFactory {
  constructor(init: IExampleComponent) {
    super({
      className: 'example',
      tagName: 'div',
      useTemplate: `
          <div>car ${init.exampleName}</div>
          <div>name ${init.exampleSurename} </div>
      `,
    });
  }
}
