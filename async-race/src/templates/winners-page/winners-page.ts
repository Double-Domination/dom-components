import './winners-page.scss';
import rawHtml from './winners-page.html';

import { DOMFactory } from '../../models/dom-factory';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

import WinnersPaginateView from '../../components/winners-paginated/winners-paginated';

/**
 *  Builds winners page
 */
class WinnersPage extends DOMFactory implements IUseState, IFolower {
  StateEngine = new StateDriver();

  public paginatedWinnersBlock: DOMFactory;

  constructor(/* initializer: IStartPageInit */) {
    super({
      tagName: 'div',
      className: 'winners-page',
      useTemplate: rawHtml,
    });

    // State Subscription
    this.StateEngine.subscribeToState(this);

    this.paginatedWinnersBlock = new WinnersPaginateView({
      totalResults: this.StateEngine.getState('totalEntries').winnersEntries,
    });
    this.paginatedWinnersBlock.renderElement(this.domNode);
  }

  updateFolower(): void {
    this.paginatedWinnersBlock = new WinnersPaginateView({
      totalResults: this.StateEngine.getState('totalEntries').winnersEntries,
    });

    // this.paginatedWinnersBlock.domNode.replaceChildren()
  }
}

export default WinnersPage;
