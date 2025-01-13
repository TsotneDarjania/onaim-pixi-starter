import { Container, ContainerChild } from "pixi.js";
import { Game } from "./game";

export class Scene {
  displayWidth: number = 0;
  displayHeight: number = 0;

  mainContainer!: Container;

  constructor(public game: Game) {
    this.mainContainer = game.stage;

    this.displayWidth = Number(this.game.canvas.style.width.replace("px", ""));
    this.displayHeight = Number(
      this.game.canvas.style.height.replace("px", "")
    );
  }

  add(obj: ContainerChild) {
    this.mainContainer.addChild(obj);
  }

  remove(obj: ContainerChild) {
    this.mainContainer.removeChild(obj);
  }
}
