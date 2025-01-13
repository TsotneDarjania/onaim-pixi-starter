import { Sprite, Texture, Text } from "pixi.js";
import { Game } from "../entities/game";
import { Scene } from "../entities/scene";
import { GameObjectNames } from "../enums/gameObjectNames";
import gsap from "gsap";
import { fontEnums } from "../enums/fontEnums";

export class PreloadScene extends Scene {
  constructor(game: Game) {
    super(game);

    this.init();
  }

  init() {
    this.addLogo();
    this.addTitle();
  }

  addLogo() {
    const logo = new Sprite(Texture.from(GameObjectNames.OnAim));
    logo.x = this.displayWidth / 2;
    logo.y = this.displayHeight / 2;
    logo.anchor = 0.5;

    this.add(logo);

    // Animation
    gsap.to(logo, {
      duration: 1,
      alpha: 0.5,
      yoyo: true,
      repeat: -1,
      ease: "power1",
    });
  }

  addTitle() {
    const title = new Text({
      text: "OnAim Pixi Starter",
      style: {
        fill: "white",
        fontFamily: fontEnums.customFont_1,
      },
    });
    title.x = this.displayWidth / 2;
    title.y = this.displayHeight / 2 + 140;
    title.anchor = 0.5;
    this.add(title);
  }
}
