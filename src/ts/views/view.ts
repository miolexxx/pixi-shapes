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

  private addBackground() {
    this._background = new Sprite(Texture.WHITE);
    this._background.width = this.app.screen.width;
    this._background.height = this.app.screen.height;
    this._background.tint = 0x000;
    this._background.interactive = true;
    this._app.stage.addChild(this._background);
  }

  public addShapesPerSecondHandler(handler: (shapesPerSecond: number) => void) {
    this._shapesPerSecondPlus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._shapesPerSecond as HTMLInputElement;
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });

    this._shapesPerSecondMinus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._shapesPerSecond as HTMLInputElement;
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });
  }

  public addGravityHandler(handler: (gravity: number) => void) {
    this._gravityPlus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._gravity as HTMLInputElement;
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });

    this._gravityMinus?.addEventListener('click', () => {
      const element: HTMLInputElement = this._gravity as HTMLInputElement;
      handler(isNaN(Number.parseInt(element.value)) ? 0 : Number.parseInt(element.value));
    });
  }

  public addAppContainerHandler(func: (mousePoint: { x: number; y: number }) => void) {
    this._background.on('click', (e) => {
      const mousePoint: { x: number; y: number } = {
        x: e.data.global.x / 2,
        y: e.data.global.y / 2,
      };
      func(mousePoint);
    });
  }

  public updateInfo(numberOfShapes: number, occupiedArea: number) {
    this._numberOfShapes!.innerText = numberOfShapes.toString();
    this._occupiedArea!.innerText = occupiedArea.toString();
  }

  public addShape(shape: Shape) {
    this._app.stage.addChild(shape.graphics);
  }

  public removeShape(shape: Shape) {
    this?._app.stage.removeChild(shape.graphics);
    shape.graphics.destroy(true);
  }

  public get containerWidth(): number {
    return this._background.width;
  }
  public get containerHeight(): number {
    return this._background.height;
  }

  public get app(): Application {
    return this._app;
  }
}
