import { Shape } from './shape';
import { random } from '../utils';

/**
 * Circle
 */
export class Circle extends Shape {
  /**
   * Returns new ```Circle``` instance
   * @param x Circle center x position
   * @param y Circle center y position
   * @param width Circle diameter
   */
  constructor(x: number, y: number, width: number) {
    super(x, y, width);
  }

  protected render(): void {
    this.graphics
      .beginFill(this.color)
      .drawCircle(this.initX, this.initY, this.width / 2)
      .endFill();
  }

  public getArea(): number {
    // Area of Circle = PI*r^2
    return Math.PI * Math.pow(this.width / 2, 2);
  }
}

/**
 * Ellipse
 */
export class Ellipse extends Shape {
  /**
   * Returns new ```Ellipse``` instance
   * @param x Ellipse center x position
   * @param y Ellipse center y position
   * @param width Ellipse width
   * @param height Ellipse height
   */
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }

  protected render() {
    this.graphics
      .beginFill(this.color)
      .drawEllipse(this.initX, this.initY, this.width / 2, this.height / 2)
      .endFill();
  }

  public getArea(): number {
    // Area of Ellipse = PI * w/2 * h/2
    return Math.PI * (this.width / 2) * (this.height / 2);
  }
}

/**
 * Rectangle
 */
export class Rectangle extends Shape {
  /**
   * Returns new ```Rectangle``` instance
   * @param x Top left corner of Rectangle x position
   * @param y Top left corner of Rectangle y position
   * @param width Rectangle width
   * @param height Rectangle height
   */
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }

  protected render(): void {
    this.graphics.beginFill(this.color).drawRect(this.initX, this.initY, this.width, this.height).endFill();
  }

  public getArea(): number {
    // Area of Rectangle = w*h
    return this.width * this.height;
  }
}

/**
 * Triangle
 */
export class Triangle extends Shape {
  /**
   * Returns new ```Triangle``` instance
   * @param x Triangle vertex x position
   * @param y Triangle vertex y position
   * @param width Triangle width
   * @param height Triangle height
   */
  constructor(x: number, y: number, width: number, height: number) {
    // points of Triangle
    const points: Array<number> = [
      x,
      y,
      random(x, x + width / 2),
      random(y + height / 3, y + height),
      random(Math.max(0, x - width / 2), x),
      random(y + height / 3, y + height),
    ];
    super(x, y, width, height, points);
  }
}

/**
 * Pentagon
 */
export class Pentagon extends Shape {
  /**
   * Returns new ```Pentagon``` instance
   * @param x Pentagon vertex x position
   * @param y Pentagon vertex y position
   * @param width Pentagon width
   * @param height Pentagon height
   */
  constructor(x: number, y: number, width: number, height: number) {
    // points of Pentagon
    const points: Array<number> = [
      x,
      y,
      random(x, x + width / 2),
      random(y, y + height / 2),
      random(x, x + width / 2),
      random(y + height / 2, y + height),
      random(Math.max(0, x - width / 2), x),
      random(y + height / 2, y + height),
      random(Math.max(0, x - width / 2), x),
      random(y, y + height / 2),
    ];
    super(x, y, width, height, points);
  }
}

/**
 * Hexagon
 */
export class Hexagon extends Shape {
  /**
   * Returns new ```Hexagon``` instance
   * @param x Hexagon vertex x position
   * @param y Hexagon vertex y position
   * @param width Hexagon width
   * @param height Hexagon height
   */
  constructor(x: number, y: number, width: number, height: number) {
    // points of Hexagon
    const points: Array<number> = [
      x,
      y,
      random(x, x + width / 2),
      random(y, y + height / 2),
      random(x, x + width / 2),
      random(y + height / 2, y + height),
      random(Math.max(0, x - width / 2), x),
      random(y + height / 2, y + height),
      random(Math.max(0, x - width / 2), x),
      random(y, y + height / 2),
      random(Math.max(0, x - width / 2), x),
      random(y, y + height / 2),
    ];
    super(x, y, width, height, points);
  }
}

/**
 * Diamond
 */
export class Diamond extends Shape {
  /**
   * Returns new ```Diamond``` instance
   * @param x Diamond vertex x position
   * @param y Diamond vertex y position
   * @param width Diamond width
   * @param height Diamond height
   */
  constructor(x: number, y: number, width: number, height: number) {
    // points of Diamond
    const points: Array<number> = [x, y, x - width / 2, y + height / 2, x, y + height, x + width / 2, y + height / 2];
    super(x, y, width, height, points);
  }
}

/**
 * Star
 */
export class Star extends Shape {
  /**
   * Returns new ```Star``` instance
   * @param x Star center x position
   * @param y Star center y position
   * @param width Star width
   */
  constructor(x: number, y: number, width: number) {
    super(x, y, width);
  }

  protected render(): void {
    const numberOfPoints = random(5, 8); // number vertices of Star
    const points: Array<number> = []; // points of Star
    const step = (Math.PI * 2) / numberOfPoints; // step between vertices
    const halfStep = step / 2; // step between sub-vertices
    const start = 2 * Math.PI; // start angle
    let n, dx, dy; // temp vlues

    // generate points of Star
    for (n = 1; n <= numberOfPoints; ++n) {
      dx = this.x + (Math.cos(start + step * n - halfStep) * this.width) / 4;
      dy = this.y - (Math.sin(start + step * n - halfStep) * this.width) / 4;
      points.push(dx, dy);
      dx = this.x + (Math.cos(start + step * n) * this.width) / 2;
      dy = this.y - (Math.sin(start + step * n) * this.width) / 2;
      points.push(dx, dy);
    }

    // if points array is empty
    if (this.points.length == 0) {
      this.points = points;
    }

    // invoke parent render method
    super.render();
  }
}
