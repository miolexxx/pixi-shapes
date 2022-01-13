import { AppView } from '../views/view';
import { AppModel } from '../models/model';
import { random } from '../utils';
import { Shape } from '../models/shape';
import { SHAPE_SIZE_LIMIT } from '../config';

export class AppController {
  private view: AppView;
  private model: AppModel;

  /**
   * Returns new AppController instance
   * @param view AppView instance
   * @param model AppModel instance
   */
  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;

    this.addHandlers();
  }

  /**
   *
   * @param view
   * @param containerHeight
   * @param shouldGenerate
   */
  public tick(view: AppView, containerHeight: number, shouldGenerate: boolean): void {
    // every second generates shapes and remove unused shapes
    if (shouldGenerate) {
      this._generateRandomShapes(this.view, this.model);
      this.model.removeUnusedShapes(containerHeight, view.removeShape);
    }
    // simulates gravity
    this.model.moveShapes();
    // updates displayed info
    this.view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea);
  }

  /**
   * Add handlers to components of view
   */
  private addHandlers(): void {
    // When shape pes second changed
    this.view.addShapesPerSecondHandler(this.onShapesPerSecondUpdateHandler(this.model));
    // When gravity changed
    this.view.addGravityHandler(this.onGravityUpdateHandler(this.model));
    // When click on app background
    this.view.addAppContainerHandler(this.addShapeOnClick(this.view));
  }

  /**
   * Updates shapesPerSecond value at model
   */
  private onShapesPerSecondUpdateHandler(model: AppModel): (sps: number) => void {
    return (sps: number) => {
      model.shapesPerSecond = sps;
    };
  }

  /**
   * Updates gravity value at model
   */
  private onGravityUpdateHandler(model: AppModel): (g: number) => void {
    return (gravity: number) => {
      model.gravity = gravity;
    };
  }

  /**
   * On Shape click handler
   */
  private onShapeClickHandler(model: AppModel, view: AppView, shape: Shape): () => void {
    return () => {
      model.removeShape(shape, view.removeShape); // remove clicked shape
      model.changeColors(shape); // change color of all Shapes the same type
      view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea); // update displayed info
    };
  }

  /**
   * Add Shape to the view
   */
  private addShape(shape: Shape, view: AppView): void {
    shape.graphics.on('click', this.onShapeClickHandler(this.model, this.view, shape)); // add on click handler
    view.addShape(shape); // add Shape to the view
    view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea); // update displayed info
  }

  /**
   * Adds Shape to pointer position
   */
  private addShapeOnClick(view: AppView): (mousePoint: { x: number; y: number;}) => void {
    return (mousePoint: { x: number; y: number }): void => {
      const shape = this.model.addShape(
        mousePoint.x,
        mousePoint.y,
        random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX),
        random(SHAPE_SIZE_LIMIT.HEIGHT.MIN, SHAPE_SIZE_LIMIT.HEIGHT.MAX)
      );
      this.addShape(shape, view);
    };
  }

  /**
   * Adds few Shapes
   */
  private _generateRandomShapes(view: AppView, model: AppModel): void {
    for (let i = 0; i < model.shapesPerSecond; i++) {
      const x = random(SHAPE_SIZE_LIMIT.WIDTH.MIN / 2, view.containerWidth / 2 - SHAPE_SIZE_LIMIT.WIDTH.MIN / 2);
      const width = random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX);
      const height = random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX);
      const shape = model.addShape(x, 0 - height / 2, width, height);
      this.addShape(shape, view);
    }
  }
}
