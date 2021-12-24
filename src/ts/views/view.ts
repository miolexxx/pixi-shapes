import { Application, Sprite, Texture } from 'pixi.js';
import { Shape } from '../models/shape';

export class AppView {
  private _app: Application;
  private _numberOfShapes: HTMLElement | null;
  private _occupiedArea: HTMLElement | null;
  private _shapesPerSecond: HTMLElement | null;
  private _shapesPerSecondPlus: HTMLElement | null;
  private _shapesPerSecondMinus: HTMLElement | null;
  private _gravity: HTMLElement | null;
  private _gravityPlus: HTMLElement | null;
  private _gravityMinus: HTMLElement | null;
  private _background!: Sprite;

  /**
   * Returns new AppView instance
   * @param app PIXI.Application instance
   */
  constructor(app: Application) {
    this._app = app;
    this._app.stage.interactive = true;

    this._numberOfShapes = document.getElementById('number-of-shapes');
    this._occupiedArea = document.getElementById('occupied-area');
    this._shapesPerSecond = document.getElementById('shapes-per-second');
    this._shapesPerSecondPlus = document.getElementById('shapes-per-second-plus');
    this._shapesPerSecondMinus = document.getElementById('shapes-per-second-minus');
    this._gravity = document.getElementById('gravity');
    this._gravityPlus = document.getElementById('gravity-plus');
    this._gravityMinus = document.getElementById('gravity-minus');

    this.addBackground();
  }

  /**
   * Initialize background
   */
  private addBackground() {
    this._background = new Sprite(Texture.WHITE);
    this._background.width = this.app.screen.width;
    this._background.height = this.app.screen.height;
    this._background.tint = 0x000;
    this._background.interactive = true;
    this._app.stage.addChild(this._background);
  }

  /**
   * Adds handler to click '+' or '-' on shapes per second control
   * @param handler Click handler function
   */
  public addShapesPerSecondHandler(handler: (shapesPerSecond: number) => void) {
    this._shapesPerSecondPlus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._shapesPerSecond as HTMLInputElement;

      // if value is NaN it convey 0
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });

    this._shapesPerSecondMinus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._shapesPerSecond as HTMLInputElement;

      // if value is NaN it convey 0
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });
  }

  /**
   * Adds handler to click '+' or '-' on gravity control
   * @param handler Click handler function
   */
  public addGravityHandler(handler: (gravity: number) => void) {
    this._gravityPlus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._gravity as HTMLInputElement;

      // if value is NaN it convey 0
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });

    this._gravityMinus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._gravity as HTMLInputElement;

      // if value is NaN it convey 0
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });
  }

  /**
   * Adds handler to click on app background
   * @param handler Click handler function
   */
  public addAppContainerHandler(handler: (mousePoint: { x: number; y: number }) => void) {
    this._background.on('click', (e) => {
      const mousePoint: { x: number; y: number } = {
        x: e.data.global.x / 2,
        y: e.data.global.y / 2,
      };
      handler(mousePoint);
    });
  }

  /**
   * Update displayed number of shapes & occupied area
   * @param numberOfShapes Number of shapes value
   * @param occupiedArea Occupied area value
   */
  public updateInfo(numberOfShapes: number, occupiedArea: number) {
    this._numberOfShapes!.innerText = numberOfShapes.toString();
    this._occupiedArea!.innerText = occupiedArea.toString();
  }

  /**
   * Adds Shape to app stage
   * @param shape Shape to add
   */
  public addShape(shape: Shape) {
    this._app.stage.addChild(shape.graphics);
  }

  /**
   * Removes Shape from app stage
   * @param shape Shape to remove
   */
  public removeShape(shape: Shape) {
    this?._app.stage.removeChild(shape.graphics);
    shape.graphics.destroy(true);
  }

  /**
   * Returns width of app background
   */
  public get containerWidth(): number {
    return this._background.width;
  }

  /**
   * Returns height of app background
   */
  public get containerHeight(): number {
    return this._background.height;
  }

  /**
   * Returns this Application instance
   */
  public get app(): Application {
    return this._app;
  }
}
