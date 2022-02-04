import './garage-paginated.scss';

import { DOMFactory } from '../../models/dom-factory';
import ApiEngine from '../../models/api-engine';

import PaginationStripeView from '../pagination-stripe/pagination-stripe';
import CarCardView from '../car-card/car-card';

export type IGaragePaginatedViewInit = {
  // inputId: string;
  // actionBtn: string;
  totalCars: string;
};

/**
 *  Builds garage paginated
 */
export default class GaragePaginateView extends DOMFactory {
  // API = new ApiEngine();

  constructor(init: IGaragePaginatedViewInit) {
    super({
      className: 'garage-paginated',
    });

    // TODO: state for all results and curent (active page)

    const h2Garageheader = new DOMFactory({
      tagName: 'h2',
      nodeContent: `Garage (${init.totalCars})`,
    });

    const paginationStripeBlock = new PaginationStripeView({
      totalCount: init.totalCars,
      dataToDisplay: 'garage',
      splitBy: '7',
    });

    // const stripePlaceHolder = new DOMFactory({
    //   className: 'garage-paginated__stripe-placeholder',
    //   nodeContent: 'DDDDDDDDDD',
    // });

    // stripePlaceHolder.renderElement(paginationStripeBlock.asyncContainer.domNode);

    // render control
    this.domNode.replaceChildren(
      h2Garageheader.domNode,
      paginationStripeBlock.domNode
    );

    // this.injectCars(1, Number(init.totalCars));
  }
}
