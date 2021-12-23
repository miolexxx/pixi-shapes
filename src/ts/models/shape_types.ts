import { Shape } from './shape';
import { random } from '../utils';

export class Circle extends Shape {
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
    return Math.PI * Math.pow(this.width / 2, 2);
  }
}

export class Ellipse extends Shape {
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
    return Math.PI * (this.width / 2) * (this.height / 2);
  }
}

export class Rectangle extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
    super(x, y, width, height);
  }

  protected render(): void {
    this.graphics.beginFill(this.color).drawRect(this.initX, this.initY, this.width, this.height).endFill();
  }

  public getArea(): number {
    return this.width * this.height;
  }
}

export class Triangle extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
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

export class Pentagon extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
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

export class Hexagon extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
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

export class Diamond extends Shape {
  constructor(x: number, y: number, width: number, height: number) {
    const points: Array<number> = [x, y, x - width / 2, y + height / 2, x, y + height, x + width / 2, y + height / 2];
    super(x, y, width, height, points);
  }
}

export class Star extends Shape {
  constructor(x: number, y: number, width: number) {
    super(x, y, width);
  }

  protected render(): void {
    const numberOfPoints = random(5, 8);
    const points: Array<number> = [];
    let step = (Math.PI * 2) / numberOfPoints;
    let halfStep = step / 2;
    let start = 180 * Math.PI;
    let n, dx, dy;
    this.graphics
      .beginFill(0xff0000)
      .moveTo(this.x + (Math.cos(start) * this.width) / 2, this.y - (Math.sin(start) * this.width) / 2);

    for (n = 1; n <= numberOfPoints; ++n) {
      dx = this.x + (Math.cos(start + step * n - halfStep) * this.width) / 4;
      dy = this.y - (Math.sin(start + step * n - halfStep) * this.width) / 4;
      points.push(dx, dy);
      dx = this.x + (Math.cos(start + step * n) * this.width) / 2;
      dy = this.y - (Math.sin(start + step * n) * this.width) / 2;
      points.push(dx, dy);
    }

    if (this.points.length == 0) {
      this.points = points;
    }
    super.render();
  }
}
