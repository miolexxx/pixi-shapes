import { Graphics } from 'pixi.js';
import { getPolygonArea } from '../utils';

export abstract class Shape {
  private static nextId: number = 0;
  private _id: number;
  private _points: Array<number>;
  private _width: number;
  private _height: number;
  private _color: number;
  private _graphics: Graphics;

  constructor(x?: number, y?: number, width?: number, height?: number, points?: Array<number>) {
    this._id = Shape.nextId;
    Shape.nextId++;
    this._graphics = new Graphics();
    this._width = width || 100;
    this._height = height || 100;
    this._color = this.generateColor();
    this._points = points || [];

    this.x = x || 100;
    this.y = y || 100;

    this.render(this._points);
  }

  protected render(points: Array<number>) {
    this._graphics.beginFill(this.color, 1).drawPolygon(points).endFill();
  }

  public get graphics(): Graphics {
    return this._graphics;
  }

  public move(deltaX: number, deltaY: number) {
    this.x += deltaX;
    this.y += deltaY;
  }

  public getArea(): number {
    return getPolygonArea(this._points);
  }

  public changeColor() {
    this._color = this.generateColor();
    this.graphics.clear();
    this.render(this._points);
  }

  private generateColor(): number {
    return parseInt(Math.floor(Math.random() * 12345678).toString(), 16);
  }

  public get x() {
    return this._graphics.position.x;
  }

  public set x(value) {
    if (value < 0) {
      return;
    }
    this._graphics.position.x = value;
  }

  public get y() {
    return this._graphics.position.y;
  }

  public set y(value) {
    if (value < 0) {
      return;
    }
    this._graphics.position.y = value;
  }

  public get id(): number {
    return this._id;
  }

  public get width(): number {
    return this._width;
  }

  public set width(value: number) {
    if (value <= 0) {
      return;
    }
    this._width = value;
  }

  public get height(): number {
    return this._height;
  }

  public set height(value: number) {
    if (value <= 0) {
      return;
    }
    this._height = value;
  }

  public get color(): number {
    return this._color;
  }

  public set points(points: Array<number>) {
    this._points = points;
  }

  public get points(): Array<number> {
    return this._points;
  }
}
