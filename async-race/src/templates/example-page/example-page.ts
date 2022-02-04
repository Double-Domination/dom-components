import './example-page.scss';
import rawHtml from './example-page.html';

import { DOMFactory } from '../../models/dom-factory';

// импортируемый компонент
import ImportedComponent from '../../components/example-component/example';

interface IExampleInitializer {
  someRecivedValue: string;
}

/**
 *  Builds example page page
 */
export default class ExamplePage extends DOMFactory {
  // все элементы которые к которым мы планируем обращаься
  // явно задаём как PUBLIC
  public someElement: DOMFactory<HTMLElement>;

  public someElementWithTemplateString: DOMFactory<HTMLElement>;

  constructor(init: IExampleInitializer) {
    // оборачивающий тэг всего компонента BEM нотации идут от него
    super({
      tagName: 'div',
      className: 'example-page',
    });

    //inner public component componet (if we want to interact with them)
    this.someElement = new DOMFactory({
      tagName: 'div',
      className: 'start-page__inner-componet',
      nodeContent: 'текст внутри',
      //любой HTML фраагмент можно исползовать смотри импорт
      useTemplate: rawHtml,
    });
    this.someElement.renderElement(this.domNode);

    // ещё компонент
    this.someElementWithTemplateString = new DOMFactory({
      tagName: 'div',
      // dont forget to use BEM notations
      className: 'start-page__inner-with-templatestring',
      useTemplate: `
      <div> тут можгл написать любой html фрагмент </div>
      <div> и если нужно использовать переменные передвнные в конструктор</div>
      <div>Например так ${init.someRecivedValue}</div>
      `,
    });
    this.someElementWithTemplateString.renderElement(this.domNode);

    //  если вдруг нужно просто отрисовать компонент и не засорять this объявляем через константу
    const justForRender = new DOMFactory({
      nodeContent: 'просто для отрисовки компонента',
    });

    // готовый импортируемый комонент см. импорты
    const importedComponent = new ImportedComponent({
      // тут передаются все нужные данные для компонента они все прописаны в интерфейсе компонента
      exampleName: ' какое то переданное имя ',
      exampleSurename: 'Rfrfz nj gthtlfyyfz afvbkbz',
    });
    importedComponent.renderElement(this.domNode);
  }
}
