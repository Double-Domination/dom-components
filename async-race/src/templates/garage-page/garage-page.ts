import './garage-page.scss';

import { DOMFactory } from '../../models/dom-factory';
import { StateDriver, IUseState, IFolower } from '../../models/state-driver';

import CarControlView from '../../components/car-control/car-control';
import GaragePaginatedView from '../../components/garage-paginated/garage-paginated';
// import ColorPickerView from '../../components/color-picker/color-picker';

/**
 *  Builds garage page
 */
class GaragePage extends DOMFactory implements IUseState, IFolower {
  public garagePaginatedSection: GaragePaginatedView;

  StateEngine = new StateDriver();

  constructor(/* initializer: IStartPageInit */) {
    super({
      tagName: 'div',
      className: 'garage-page',
      nodeContent: 'content placeholder',
    });

    // state subscribers
    this.StateEngine.subscribeToState(this);

    const createCarBlock = new CarControlView({
      inputId: 'car-create',
      actionBtn: 'create car',
    });

    // createCarBlock.domNode.addEventListener('click', (evt) => {
    //   this.createCarhandler(evt);
    // });

    const updateCarBlock = new CarControlView({
      inputId: 'car-update',
      actionBtn: 'update car',
    });

    // updateCarBlock.domNode.addEventListener('click', (evt) => {
    //   this.updateCarhandler(evt);
    // });

    const btnRace = new DOMFactory({
      tagName: 'button',
      className: 'garage-page__btn-race',
      nodeContent: 'start race',
    });

    btnRace.domNode.addEventListener('click', (evt) =>
      this.btnRaceHandler(evt)
    );

    const btnReset = new DOMFactory({
      tagName: 'button',
      className: 'garage-page__btn-reset',
      nodeContent: 'reset race',
    });

    btnReset.domNode.addEventListener('click', (evt) => {
      this.resetRaceHandler(evt);
    });

    const btnGenerateCars = new DOMFactory({
      tagName: 'button',
      className: 'garage-page__btn-generate-cars',
      nodeContent: 'generate cars',
    });

    btnGenerateCars.domNode.addEventListener('click', (evt) => {
      this.generateCarsHandler(evt);
    });

    // garage subsection
    this.garagePaginatedSection = new GaragePaginatedView({
      totalCars: this.StateEngine.getState('totalEntries').garageEntries,
    });

    // render control
    this.domNode.replaceChildren(
      createCarBlock.domNode,
      updateCarBlock.domNode,
      btnRace.domNode,
      btnReset.domNode,
      btnGenerateCars.domNode,
      this.garagePaginatedSection.domNode
    );
  }
  generateCarsHandler(evt: MouseEvent) {
    console.log('generate cars handlers');
  }

  resetRaceHandler(evt: MouseEvent) {
    console.log('reset race');
  }

  updateCarhandler(evt: MouseEvent) {
    console.log('update car handler');
  }

  createCarhandler(evt: any) {
    console.log('createcar handler');
  }

  btnRaceHandler(evt: MouseEvent): any {
    console.log('race handler');
  }

  updateFolower(): void {
    this.garagePaginatedSection = new GaragePaginatedView({
      totalCars: this.StateEngine.getState('totalEntries').garageEntries,
    });
  }
}

export default GaragePage;
