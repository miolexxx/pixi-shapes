import { AppView } from '../views/view';
import { AppModel } from '../models/model';
import { random } from '../utils';
import { Shape } from '../models/shape';
import { SHAPE_SIZE_LIMIT } from '../config';

export class AppController {
  private view: AppView;
  private model: AppModel;
  constructor(view: AppView, model: AppModel) {
    this.view = view;
    this.model = model;

    this.addHandlers();
  }

  // on app tick
  public tick(view: AppView, containerWidth: number, containerHeight: number, shouldGenerate: boolean) {
    if (shouldGenerate) {
      this._generateRandomShapes(this.view, this.model);
      this.model.removeUnusedShapes(containerWidth, containerHeight, view.removeShape);
    }
    this.model.moveShapes();

    this.view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea);
  }

  // register handlers
  private addHandlers() {
    this.view.addShapesPerSecondHandler(this.onShapesPerSecondUpdateHandler(this.model));

    this.view.addGravityHandler(this.onGravityUpdateHandler(this.model));

    this.view.addAppContainerHandler(this.addShapeOnClick(this.view));
  }

  // on shapes per second update
  private onShapesPerSecondUpdateHandler(model: AppModel): (sps: number) => void {
    return (sps: number) => {
      model.shapesPerSecond = sps;
    };
  }

  // on gravity update
  private onGravityUpdateHandler(model: AppModel): (g: number) => void {
    return (gravity: number) => {
      model.gravity = gravity;
    };
  }

  // on shape click
  private onShapeClickHandler(model: AppModel, view: AppView, shape: Shape): () => void {
    return () => {
      model.removeShape(shape, view.removeShape);
      view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea);
    };
  }

  private addShape(shape: Shape, view: AppView) {
    shape.graphics.on('click', this.onShapeClickHandler(this.model, this.view, shape));
    view.addShape(shape);
    view.updateInfo(this.model.numberOfShapes, this.model.occupiedArea);
  }

  // on background click
  private addShapeOnClick(view: AppView) {
    return (mousePoint: { x: number; y: number }) => {
      const shape = this.model.addShape(
        mousePoint.x,
        mousePoint.y,
        random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX),
        random(SHAPE_SIZE_LIMIT.HEIGHT.MIN, SHAPE_SIZE_LIMIT.HEIGHT.MAX)
      );
      this.addShape(shape, view);
    };
  }

  private _generateRandomShapes(view: AppView, model: AppModel) {
    for (let i = 0; i < model.shapesPerSecond; i++) {
      const shape = model.addShape(
        random(SHAPE_SIZE_LIMIT.WIDTH.MIN / 2, view.containerWidth / 2 - SHAPE_SIZE_LIMIT.WIDTH.MIN / 2),
        random(SHAPE_SIZE_LIMIT.HEIGHT.MIN / 2, view.containerHeight / 2 - SHAPE_SIZE_LIMIT.HEIGHT.MIN / 2),
        random(SHAPE_SIZE_LIMIT.WIDTH.MIN, SHAPE_SIZE_LIMIT.WIDTH.MAX),
        random(SHAPE_SIZE_LIMIT.HEIGHT.MIN, SHAPE_SIZE_LIMIT.HEIGHT.MAX)
      );
      this.addShape(shape, view);
    }
  }
}
