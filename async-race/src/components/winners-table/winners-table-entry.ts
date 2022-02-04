import './winners-table.scss';

import { DOMFactory } from '../../models/dom-factory';

export type IWinnersTableEntryInit = {
  // winnerStateContainer: string; // must be uniq
  // carIndex: string,
  // carImg: string,
  // carName: string,

  // //fecived from backend
  entryNumber: string;
  carId: number;
  carWinsCount: number;
  carBestLap: number;
};

/**
 *  Builds table entry
 */
export default class WinnersTableEntry extends DOMFactory {
  constructor(init: IWinnersTableEntryInit) {
    super({
      className: 'winners-entry',
      tagName: 'tr',
      useTemplate: `
          <th scope="row">${init.entryNumber}</th>
          <td>car ${init.carId}</td>
          <td>name ${init.carId} </td>
          <td>wins ${init.carWinsCount}</td>
          <td>best lap ${init.carBestLap}</td> 
      `,
    });
  }
}
