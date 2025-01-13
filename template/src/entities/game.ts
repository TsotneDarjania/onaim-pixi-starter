import { Application } from "pixi.js";
import { Scene } from "./scene";
import { gameConfig } from "../config/gameConfig";
import { PreloadScene } from "../scenes/preload";
import { loadResources } from "./loadResources";

export class Game extends Application {
  preloadScene!: Scene;

  constructor() {
    super();

    this.setup()
      .then(() => {
        document.getElementById("pixi-container")!.appendChild(this.canvas);
        console.log("OnAim Pixi Game Starter 2025 Version 1.0");
        this.startGame();
      })
      .catch((err) => {
        throw new Error(err);
      });
  }

  private async setup() {
    await this.init({
      background: gameConfig.backgroundColor,
      resizeTo: window,
      antialias: true,
      resolution: window.devicePixelRatio || 1,
      autoDensity: true,
      roundPixels: true,
    });

    await loadResources();
  }

  startGame() {
    this.preloadScene = new PreloadScene(this);
  }
}
