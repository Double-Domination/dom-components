import './styles-general.scss';
import App from './models/app';
import { StateDriver } from './models/state-driver';

async function init() {
  const carsTotalEnntries = async () => {
    let result = null;
    try {
      const response = await fetch(`http://127.0.0.1:3000/garage`);
      const processedJson = await response.json();
      result = processedJson;
      // console.log(result);
    } catch (err: any) {
      throw new Error(err);
    }

    return result.length.toString();
  };

  const winnersTotalEnntries = async () => {
    let result = null;
    try {
      const response = await fetch(`http://127.0.0.1:3000/winners`);
      const processedJson = await response.json();
      result = processedJson;
      // console.log(result);
    } catch (err: any) {
      throw new Error(err);
    }

    return result.length.toString();
  };

  const garageEntries = await carsTotalEnntries();
  const winnersEntries = await winnersTotalEnntries();

  const stateInit = new StateDriver();
  stateInit.createOrUseExistedState('totalEntries', {
    garageEntries,
    winnersEntries,
  });
  // console.log(garageEntries);

  console.log(StateDriver.getAllStates());

  const rootElement = document.querySelector('body') as HTMLElement;
  const app = new App({ className: 'general-wrapper' });
  rootElement.appendChild(app.domNode);
}

init().catch((err) => {
  throw new Error(err);
});
