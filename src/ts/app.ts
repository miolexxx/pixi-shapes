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

  /**
   * Returns new AppManager instance
   */
  public constructor() {
    // create PIXI.Application instance
    this.appContainer = document.getElementById('app');
    this.app = new Application({
      width: this.appContainer?.clientWidth,
      height: this.appContainer?.clientHeight,
      antialias: true,
    });
    // Add Application to child
    this.appContainer?.appendChild(this.app.view);
    // Init Model, View and Controller
    this.model = new AppModel();
    this.view = new AppView(this.app);
    this.controller = new AppController(this.view, this.model);
    // Init ticker
    this.initTicker(this.app, this.controller, this.view);
  }

  /**
   *
   * @param app PIXI.Application instance
   * @param controller AppController instance
   * @param view AppView instance
   */
  private initTicker(app: Application, controller: AppController, view: AppView): void {
    let renderCounter = 0;
    app.ticker.add(() => {
      const tickerInterval = app.ticker.elapsedMS; // difference between frames
      const shouldGenerate = (renderCounter * tickerInterval) % 1000 < tickerInterval; // 'true' if a second passed

      // Every tick invoke controller method 'tick'
      controller.tick(view, view.containerHeight, shouldGenerate);

      renderCounter++;
    });
  }
}

window.onload = function () {
  new AppManager();
};
