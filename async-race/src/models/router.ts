import { DOMFactory } from './dom-factory';

import GaragePage from '../templates/garage-page/garage-page';
import WinnersPage from '../templates/winners-page/winners-page';

class RouterController {
  page: DOMFactory;

  private defaultPageId = 'garage';

/**
 * @param {DOMFactory} pageClass simply pass to object key page constructor
 *  */ 
  private PageIDList: { [key: string]: DOMFactory } = {
    garage: new GaragePage(),
    winners: new WinnersPage(),
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


