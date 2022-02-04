import './car-card.scss';

import { DOMFactory } from '../../models/dom-factory';

export type ICarCardViewInit = {
  // totalCount: string;
  // splitBy: string;
  carName: string;
  carStateContainer: string; // must be uniq
  carColor: string;
  // carId: string; //TODO: may be reqired in future
};

/**
 *  Builds pagination
 */
export default class CarCardView extends DOMFactory {
  constructor(init: ICarCardViewInit) {
    super({
      className: 'car-card',
    });

    // car name header
    const carNameHeading = new DOMFactory({
      className: 'car-card__car-name',
      nodeContent: `${init.carName}`,
    });
    carNameHeading.renderElement(this.domNode);

    // car controlboard
    const carControlBoardBlock = new DOMFactory({
      className: 'car-card__control-bar',
    });
    carControlBoardBlock.renderElement(this.domNode);

    // control Buttons
    const selectCarBtn = new DOMFactory({
      tagName: 'button',
      className: 'car-card__select-btn',
      nodeContent: 'select car',
    });
    selectCarBtn.renderElement(carControlBoardBlock.domNode);

    const carRemoveBtn = new DOMFactory({
      tagName: 'button',
      className: 'car-card__remove-btn',
      nodeContent: 'remove car',
    });
    carRemoveBtn.renderElement(carControlBoardBlock.domNode);

    const carStartBtn = new DOMFactory({
      tagName: 'button',
      className: 'car-card__start-car',
      nodeContent: 'start car',
    });
    carStartBtn.renderElement(carControlBoardBlock.domNode);

    const carStopBtn = new DOMFactory({
      tagName: 'button',
      className: 'car-card__stop-car',
      nodeContent: 'stopcar',
    });
    carStopBtn.renderElement(carControlBoardBlock.domNode);

    // race track
    const raceTrackBlock = new DOMFactory({
      className: 'car-card__race-track',
    });
    raceTrackBlock.renderElement(this.domNode);

    // car icon on race raceTrack
    const carOnRaceTrack = new DOMFactory({
      tagName: 'span',
      className: 'car-card__carsvg',
    });
    carOnRaceTrack.domNode.style.backgroundColor = init.carColor;
    carOnRaceTrack.renderElement(raceTrackBlock.domNode);

    // render control
    // this.domNode.replaceChildren();
  }
}
