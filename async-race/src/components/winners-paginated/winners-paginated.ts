import './winners-paginated.scss';

import { DOMFactory } from '../../models/dom-factory';

import PaginationStripeView from '../pagination-stripe/pagination-stripe';
// import CarCardView from '../car-card/car-card';

export type IWinnersPaginatedViewInit = {
  totalResults: string;
};

/**
 *  Builds winners paginated
 */
export default class WinnersPaginateView extends DOMFactory {
  constructor(init: IWinnersPaginatedViewInit) {
    super({
      className: 'winners-paginated',
    });

    const h2Winnersheader = new DOMFactory({
      tagName: 'h2',
      nodeContent: `Winners (${init.totalResults})`,
    });

    const paginationStripeBlock = new PaginationStripeView({
      splitBy: '10', // chek specification
      totalCount: init.totalResults,
      dataToDisplay: 'winners',
    });

    // render control
    this.domNode.replaceChildren(
      h2Winnersheader.domNode,
      paginationStripeBlock.domNode
    );
  }
}
