import { random } from '../utils';
import { Shape } from './shape';
import * as SHAPES from './shape_types';

const shapeClasses = [
  SHAPES.Triangle,
  SHAPES.Rectangle,
  SHAPES.Circle,
  SHAPES.Ellipse,
  SHAPES.Pentagon,
  SHAPES.Hexagon,
  SHAPES.Diamond,
  SHAPES.Star,
];

export class AppModel {
  private _shapes: Array<Shape>;
  private _gravity: number = 0;
  private _shapesPerSecond: number = 0;

  constructor() {
    this._shapes = [];
    this.gravity = 1;
    this.shapesPerSecond = 2;
  }

  public addShape(x: number, y: number, width: number, height: number): Shape {
    const ShapeClass = shapeClasses[random(0, shapeClasses.length)];
    const newShape = new ShapeClass(x, y, width, height);
    newShape.graphics.interactive = true;
    newShape.graphics.buttonMode = true;
    this._shapes.push(newShape);

    return newShape;
  }

  public removeShape(shape: Shape, callback: (shape: Shape) => void) {
    const shapeIndex = this._shapes.findIndex((s) => s.id === shape.id);
    callback(this._shapes[shapeIndex]);
    this._shapes.splice(shapeIndex, 1);
  }

  public removeUnusedShapes(containerWidth: number, containerHeight: number, callback: (shape: Shape) => void) {
    this._shapes
      .filter((shape) => shape?.x >= containerWidth || shape?.y >= containerHeight)
      .forEach((shape) => {
        this.removeShape(shape, callback);
      });
  }

  public moveShapes() {
    this._shapes.forEach((shape) => {
      shape.move(0, this._gravity);
    });
  }

  public get occupiedArea() {
    return Math.ceil(this._shapes.reduce((prev, curr) => prev + curr.getArea(), 0));
  }

  public get gravity() {
    return this._gravity;
  }

  public set gravity(value) {
    if (value < 0 || value > 10) {
      return;
    }
    this._gravity = Number(value);
  }

  public get shapesPerSecond() {
    return this._shapesPerSecond;
  }

  public set shapesPerSecond(value) {
    if (value < 0) {
      return;
    }
    this._shapesPerSecond = Number(value);
  }

  public get numberOfShapes() {
    return this._shapes.length;
  }
}
