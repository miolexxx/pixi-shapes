import { Application } from 'pixi.js';
import { AppController } from './controllers/controller';
import { AppModel } from './models/model';
import { AppView } from './views/view';

function initTicker(app: Application, controller: AppController, view: AppView) {
  let renderCounter = 0;
  app.ticker.add(() => {
    const tickerInterval = app.ticker.elapsedMS;
    const shouldGenerate = (renderCounter * tickerInterval) % 1000 < tickerInterval; // every second equals 'true'

    controller.tick(view, view.containerWidth, view.containerHeight, shouldGenerate);

    renderCounter++;
  });
}

const appContainer: HTMLElement | null = document.getElementById('app');
const app = new Application({
  width: appContainer?.clientWidth,
  height: appContainer?.clientHeight,
  antialias: true,
});

appContainer?.appendChild(app.view);

const model = new AppModel();
const view = new AppView(app);
const controller = new AppController(view, model);

initTicker(app, controller, view);
