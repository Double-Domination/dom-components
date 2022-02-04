import { DOMFactory } from './dom-factory';

import ExamplePage from '../templates/example-page/example-page';

class RouterController {
  page: DOMFactory;

  // страница по умолчанию
  private defaultPageId = 'example';

/**
 * @param {DOMFactory} pageClass simply pass to object key page constructor
 *  */ 
  private PageIDList: { [key: string]: DOMFactory } = {
    //собствено сдесь конструкторы каждой страницы по отдельности
    example: new ExamplePage({
      someRecivedValue:'какое либо передаваемое значение'
    }),

    emptyPage: new DOMFactory({
      nodeContent:'просто пустая страница'
    })
  };

  constructor() {
    // set default route hash
    window.location.hash = `#${this.defaultPageId}`;

    // set router wrapper default representation
    this.page = new DOMFactory({
      className: 'route-wrap',
      nodeContent: 'CONTENT IS LOADING',
    });

    this.renderNewPageHandler();
    this.enableRouteChange();
  }

  renderNewPageHandler(idPage: string = this.defaultPageId) {
    const tmpPage = this.PageIDList[idPage];
    if (typeof tmpPage === 'undefined') {
      throw new Error(`cant find ${idPage}`);
    }

    this.page.domNode.replaceChildren(tmpPage.domNode);
  }

  enableRouteChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      this.renderNewPageHandler(hash);
    });
  }
}

export default RouterController;


