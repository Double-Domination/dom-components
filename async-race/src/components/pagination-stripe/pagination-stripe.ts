import './pagination-stripe.scss';

import { DOMFactory } from '../../models/dom-factory';
import ApiEngine from '../../models/api-engine';
import CarCardView from '../car-card/car-card';

export type IPaginationStripeViewInit = {
  totalCount: string;
  dataToDisplay: string;
  splitBy?: string;
};

/**
 *  Builds pagination
 */

type PaginationInnerState = {
  currentPage: number;
  totalPages: number;
  entriesPerPage: number;
  overallEntries: number;
};

export default class PaginationStripeView extends DOMFactory {
  innerState: PaginationInnerState;

  private DATA_TO_DISPLAY: string;

  private FIRST_PAGE = 0; // first page always exists on paginationStripeBlock

  private LAST_PAGE: number;

  private SPLIT_BY: number;

  private DEFAULT_SPLIT_BY = 7; // this recived from task description

  private TOTAL_ENTRIES: number;

  private curentPageIdentifer: DOMFactory<HTMLElement>;

  public asyncContainer: DOMFactory<HTMLElement>;

  private API = new ApiEngine();

  constructor(init: IPaginationStripeViewInit) {
    super({
      className: 'pagination-stripe',
    });

    this.DATA_TO_DISPLAY = init.dataToDisplay;

    this.SPLIT_BY = init.splitBy ? Number(init.splitBy) : this.DEFAULT_SPLIT_BY;

    this.LAST_PAGE = Math.ceil(Number(init.totalCount) / this.SPLIT_BY);

    this.TOTAL_ENTRIES = Number(init.totalCount);

    // TODO: state management
    this.innerState = {
      currentPage: this.FIRST_PAGE,
      totalPages: this.LAST_PAGE,
      entriesPerPage: this.SPLIT_BY,
      overallEntries: this.TOTAL_ENTRIES,
    };

    // mark inital page
    this.curentPageIdentifer = new DOMFactory({
      tagName: 'span',
      className: 'paginaton-stripe__page-identifer',
    });
    this.curentPageIdentifer.renderElement(this.domNode);

    const prevBtn = new DOMFactory({
      tagName: 'button',
      nodeContent: 'prev page',
      className: 'pagination-stripe__prev-btn',
    });
    prevBtn.renderElement(this.domNode);

    // prevBtn handler
    prevBtn.domNode.addEventListener('click', (evt) =>
      this.prevBtnHandler(evt)
    );

    const nextBtn = new DOMFactory({
      tagName: 'button',
      nodeContent: 'next page',
      className: 'pagination-next-btn',
    });
    nextBtn.renderElement(this.domNode);

    // prevBtn handler
    nextBtn.domNode.addEventListener('click', (evt) =>
      this.nextBtnHandler(evt)
    );

    // lines insertion logic

    // ul creation
    const ulBlock = new DOMFactory({
      tagName: 'ul',
      className: 'pagination-stripe__descriptor',
    });

    // hanling clicks to handle page changes
    ulBlock.domNode.addEventListener('click', (evt: MouseEvent) =>
      this.pageBtnChlickHandler(evt)
    );

    // entries creation
    for (let i = 1; i <= this.LAST_PAGE; i += 1) {
      const liBlock = new DOMFactory({
        tagName: 'li',
        className: 'pagination-stripe__li',
      });
      liBlock.renderElement(ulBlock.domNode);

      const pagebtnBlock = new DOMFactory({
        tagName: 'button',
        className: 'pagination-stripe__btn',
        nodeContent: `${i}`,
      });
      pagebtnBlock.renderElement(liBlock.domNode);
      liBlock.renderElement(ulBlock.domNode);
    }

    ulBlock.renderElement(this.domNode);

    // async container init (async data will placed here)
    this.asyncContainer = new DOMFactory({
      className: 'pagination-stripe__async-container',
      nodeContent: 'Loading',
    });
    this.asyncContainer.renderElement(this.domNode);

    // toggle active class on initiali selected page
    this.selectPaginationPage(this.innerState.currentPage);
  }

  private selectPaginationPage(recivedNumber: number) {
    // query element
    const ulLine = this.domNode.querySelector(
      '.pagination-stripe__descriptor'
    ) as HTMLElement;

    // reset all active class names
    const innerButtons = ulLine.querySelectorAll(
      '.pagination-stripe__btn'
    ) as NodeListOf<HTMLElement>;

    innerButtons.forEach((curEl) => {
      curEl.classList.remove('pagination-stripe__btn--active');
    });

    // set active class
    (
      [...ulLine.children][recivedNumber].lastChild as HTMLElement
    ).classList.add('pagination-stripe__btn--active');

    // update inner state
    this.innerState.currentPage = recivedNumber;

    // change curent page representation
    this.curentPageIdentifer.domNode.innerHTML = `${
      this.innerState.currentPage + 1 // in array count starts from 0
    }`;

    this.fetchData(this.innerState.currentPage + 1);
  }

  private prevBtnHandler(evt: MouseEvent): void {
    //
    switch (this.innerState.currentPage) {
      case this.FIRST_PAGE:
        break;

      default:
        this.innerState.currentPage -= 1;
        this.selectPaginationPage(this.innerState.currentPage);
        break;
    }
  }

  private nextBtnHandler(evt: MouseEvent): void {
    switch (this.innerState.currentPage) {
      case this.LAST_PAGE - 1: // this is becase in ui count starts from 1
        break;

      default:
        this.innerState.currentPage += 1;
        this.selectPaginationPage(this.innerState.currentPage);
        break;
    }
  }

  private pageBtnChlickHandler(evt: MouseEvent) {
    if (
      (evt.target as HTMLElement).classList.contains('pagination-stripe__btn')
    ) {
      const element = evt.target as HTMLElement;

      const clickedElemIndex = Array.from(
        (element.closest('.pagination-stripe__descriptor') as HTMLElement)
          .children
      ).indexOf(element.parentNode as HTMLElement);

      // set innerState
      this.innerState.currentPage = clickedElemIndex;

      // set active page button
      this.selectPaginationPage(clickedElemIndex);
    }
  }

  async fetchData(
    recivedPageNum: number,
    dataToDisplay: string = this.DATA_TO_DISPLAY,
    splitBy: number = this.SPLIT_BY
  ) {
    // clear results
    (this.asyncContainer.domNode as HTMLElement).innerHTML = '';

    // get data
    let result: any;
    try {
      result = await (this.API as any)[`${dataToDisplay}`](
        recivedPageNum,
        splitBy
      );

      // await result.forEach((curElem: DOMFactory<HTMLElement>) => {
      //   curElem.renderElement(
      //     this.asyncContainer.domNode.lastChild as HTMLElement
      //   );
      // });

      await result.renderElement(this.asyncContainer.domNode);
    } catch (error) {
      throw new Error(`CAONT FIND DATA ${error}`);
    }
  }
}
