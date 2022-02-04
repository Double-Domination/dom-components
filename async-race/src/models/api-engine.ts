import CarCardView from '../components/car-card/car-card';
import WinnersTableEntry from '../components/winners-table/winners-table-entry';
import { DOMFactory } from './dom-factory';

export default class ApiEngine {
  tbodyBlock: DOMFactory<HTMLElement>;

  constructor() {
    this.tbodyBlock = new DOMFactory();
  }

  async garage(recivedPageNum: number, splitBy: number): Promise<any> {
    let result = null;
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/garage?_page=${recivedPageNum}&_limit=${splitBy}`
      );
      const processedJson = await response.json();
      result = processedJson;
    } catch (err: any) {
      throw new Error(err);
    }

    result = JSON.parse(JSON.stringify(result));

    result = result.map((current: any) => {
      const tmpContainer = new CarCardView({
        carName: current.name,
        carColor: current.color,
        carStateContainer: current.id,
      });
      return tmpContainer;
      // tmpContainer.renderElement(this.asyncContainer.domNode);
    });

    // formulate dom

    const resultingGarageBlock = new DOMFactory({
      nodeContent: '-=garage LIST=-',
    });
    result.forEach((cur: any) =>
      cur.renderElement(resultingGarageBlock.domNode)
    );
    return resultingGarageBlock;
  }

  async winners(recivedPageNum: number, splitBy: number): Promise<any> {
    let result = null;
    try {
      const response = await fetch(
        `http://127.0.0.1:3000/winners?_page=${recivedPageNum}&_limit=${splitBy}&_sort=id&_order=ASC`
      );
      const processedJson = await response.json();
      result = processedJson;
      // console.log(result);
    } catch (err: any) {
      throw new Error(err);
    }

    result = JSON.parse(JSON.stringify(result));

    result = result.map((current: any, curIndex: number) => {
      // console.log(recivedPageNum, 'pagenum');
      // console.log(splitBy, 'split');
      const tmpContainer = new WinnersTableEntry({
        entryNumber: (curIndex + 1 + (recivedPageNum - 1) * splitBy).toString(),
        carId: current.id,
        carWinsCount: current.wins,
        carBestLap: current.time,
      });
      return tmpContainer;
    });

    // formulate dom

    // table
    const winnersResultingContainer = new DOMFactory({
      tagName: 'table',
      className: 'winners-table',
    });

    // table header
    const tableHeaderBlock = new DOMFactory({
      className: 'winner-table__thead',
      tagName: 'thead',
    });
    tableHeaderBlock.renderElement(winnersResultingContainer.domNode);

    // table header row
    const tableHeaderRowBlock = new DOMFactory({
      tagName: 'tr',
      className: 'winner-table__thead-row',
    });
    tableHeaderRowBlock.renderElement(tableHeaderBlock.domNode);

    // th[number] in headerRow
    const thNumberBlock = new DOMFactory({
      tagName: 'th',
      nodeContent: 'number',
    });
    thNumberBlock.renderElement(tableHeaderRowBlock.domNode);

    // th[car] in headerRow
    const thCarBlock = new DOMFactory({
      tagName: 'th',
      nodeContent: 'car',
    });
    thCarBlock.renderElement(tableHeaderRowBlock.domNode);

    // th[name] in headerRow
    const thCarNameBlock = new DOMFactory({
      tagName: 'th',
      nodeContent: 'name',
    });
    thCarNameBlock.renderElement(tableHeaderRowBlock.domNode);

    // th[wins] in headerRow
    const thWinsBlock = new DOMFactory({
      tagName: 'th',
      nodeContent: 'wins',
    });
    thWinsBlock.renderElement(tableHeaderRowBlock.domNode);

    // th[bestTime] in headerRow
    const thBestTimeBlock = new DOMFactory({
      tagName: 'th',
      nodeContent: 'best time',
    });
    thBestTimeBlock.renderElement(tableHeaderRowBlock.domNode);

    // tbody section - insert rows here
    this.tbodyBlock = new DOMFactory({
      tagName: 'tbody',
      className: 'winner-table__tbody',
    });
    this.tbodyBlock.renderElement(winnersResultingContainer.domNode);

    // table entries
    result.forEach((cur: any) => cur.renderElement(this.tbodyBlock.domNode));
    return winnersResultingContainer;
  }
}

