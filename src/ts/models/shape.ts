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

  private _initX: number;
  private _initY: number;

  /**
   * Returns new Shape instance
   * @param x Shape x position
   * @param y Shape y position
   * @param width Shape width
   * @param height Shape height
   * @param points Polygon points
   */
  constructor(x?: number, y?: number, width?: number, height?: number, points?: Array<number>) {
    // set id
    this._id = Shape.nextId;
    Shape.nextId++;

    // fill fields
    this._graphics = new Graphics();
    this._width = width || 100;
    this._height = height || 100;
    this._color = this.generateColor();
    this._points = points || [];
    this.x = x || 100;
    this.y = y || 100;

    // sets initial x and y values
    this._initX = this.x;
    this._initY = this.y;

    // renders shape
    this.render();
  }

  /**
   * Draws shape on this _graphics
   */
  protected render(): void {
    this._graphics.beginFill(this.color, 1).drawPolygon(this._points).endFill();
  }

  /**
   * Returns graphics instance of Shape
   */
  public get graphics(): Graphics {
    return this._graphics;
  }

  /**
   * Changes Shape x and y position
   * @param deltaX Value who will be added to current ```x``` position
   * @param deltaY Value who will be added to current ```y``` position
   */
  public move(deltaX: number, deltaY: number): void {
    this.x += deltaX;
    this.y += deltaY;
  }

  /**
   * Returns area of Shape in px^2
   * @returns Area of shape
   */
  public getArea(): number {
    return getPolygonArea(this._points);
  }

  /**
   * Changes color of Shape to random color
   */
  public changeColor(): void {
    this._graphics.tint = this.generateColor();
  }

  /**
   * Generates random color
   * @returns Random color
   */
  private generateColor(): number {
    return parseInt(Math.floor(Math.random() * 16777215).toString(), 16);
  }

  /**
   * Returns current x position
   */
  public get x(): number {
    return this._graphics.position.x;
  }

  /**
   * Sets Shape x position
   */
  public set x(value: number) {
    this._graphics.position.x = value;
  }

  /**
   * Returns current y position
   */
  public get y(): number {
    return this._graphics.position.y;
  }

  /**
   * Sets Shape y position
   */
  public set y(value: number) {
    this._graphics.position.y = value;
  }

  /**
   * Returns Shape id
   */
  public get id(): number {
    return this._id;
  }

  /**
   * Returns Shape width
   */
  public get width(): number {
    return this._width;
  }

  /**
   * Sets Shape width
   */
  public set width(value: number) {
    if (value <= 0) {
      return;
    }
    this._width = value;
  }

  /**
   * Returns Shape height
   */
  public get height(): number {
    return this._height;
  }

  /**
   * Sets Shape height
   */
  public set height(value: number) {
    if (value <= 0) {
      return;
    }
    this._height = value;
  }

  /**
   * Returns current Shape color
   */
  public get color(): number {
    return this._color;
  }

  /**
   * Returns initial x position
   */
  public get initX(): number {
    return this._initX;
  }

  /**
   * Returns initial y position
   */
  public get initY(): number {
    return this._initY;
  }

  /**
   * Sets Shape points array
   * @param points Array of points [x1, y1, ..., xn, yn]
   */
  public set points(points: Array<number>) {
    this._points = points;
  }

  /**
   * Returns current points array
   */
  public get points(): Array<number> {
    return this._points;
  }
}
