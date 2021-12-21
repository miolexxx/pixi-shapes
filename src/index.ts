import * as PIXI from 'pixi.js';

export class GameManager {
  private app: PIXI.Application;

  public constructor() {
    this.app = new PIXI.Application({
      width: window.innerWidth / 1.5,
      height: window.innerHeight / 2,
      backgroundColor: 0x000,
    });
    document.getElementById('canvas')?.appendChild(this.app.view);
  }

  private createTriangle(x: number, y: number) {}
}

window.onload = function () {
  new GameManager();
};
