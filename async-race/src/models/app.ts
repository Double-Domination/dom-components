import { DOMFactory, IDOMNodeConstructor } from './dom-factory';
import IUseRouter from './IUseRouter';

// entry point
import RouterController from './router';

import { HeaderBlockView } from '../components/header-block/header-block';

class App extends DOMFactory implements IUseRouter {
  router: RouterController;

  constructor(recived: IDOMNodeConstructor) {
    super(recived);
    // router init
    this.router = new RouterController();

    //Меню заголовка будет на всех страницах одинаковым для навигации
    // так же можно сделать и футер
    const routerHeaderElement = new HeaderBlockView({
      recivedRoutes: ['example', 'emptyPage'],
    });
    routerHeaderElement.renderElement(this.domNode);

    // router wrapper
    this.router.page.renderElement(this.domNode);
  }
}

export default App;
