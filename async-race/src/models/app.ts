import { DOMFactory, IDOMNodeConstructor } from './dom-factory';
import IUseRouter from './IUseRouter';

import ApiEngine from './api-engine';

// entry point

import { HeaderBlockView } from '../components/header-block/header-block';
import { FooterBlockView } from '../components/footer-block/footer-block';

import RouterController from './router';

class App extends DOMFactory implements IUseRouter {
  router: RouterController;

  // api = new ApiEngine();

  constructor(recived: IDOMNodeConstructor) {
    super(recived);
    // router init
    this.router = new RouterController();

    // header block
    const headerBlock = new HeaderBlockView({
      recivedRoutes: ['garage', 'winners'],
    });
    headerBlock.renderElement(this.domNode);

    // router wrapper
    this.router.page.renderElement(this.domNode);

    // footer block
    const footerBlock = new FooterBlockView();
    footerBlock.renderElement(this.domNode);

    // utility section
    // window.onload = function () {
    //   console.log('READY');
    // };
  }
}

export default App;
