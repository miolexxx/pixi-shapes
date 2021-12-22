import { Application } from 'pixi.js';
import { AppController } from './controllers/controller';
import { AppModel } from './models/model';
import { AppView } from './views/view';

export class AppManager {
  private app: Application;
  private appContainer: HTMLElement | null;
  private model: AppModel;
  private view: AppView;
  private controller: AppController;

  public constructor() {
    this.appContainer = document.getElementById('app');
    this.app = new Application({
      width: this.appContainer?.clientWidth,
      height: this.appContainer?.clientHeight,
      antialias: true,
    });

    this.appContainer?.appendChild(this.app.view);
    this.model = new AppModel();
    this.view = new AppView(this.app);
    this.controller = new AppController(this.view, this.model);

    this.initTicker(this.app, this.controller, this.view);
  }

  private initTicker(app: Application, controller: AppController, view: AppView) {
    let renderCounter = 0;
    app.ticker.add(() => {
      const tickerInterval = app.ticker.elapsedMS;
      const shouldGenerate = (renderCounter * tickerInterval) % 1000 < tickerInterval; // every second equals 'true'

      controller.tick(view, view.containerWidth, view.containerHeight, shouldGenerate);

      renderCounter++;
    });
  }
}

window.onload = function () {
  new AppManager();
};
