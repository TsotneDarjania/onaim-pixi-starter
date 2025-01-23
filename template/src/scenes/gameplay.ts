import { CustomSprite } from "../global/customGameObjects/customSprite";
import { Game } from "../entities/game";
import { Scene, SceneAssetsType } from "../entities/scene";
import { GameObjectNames } from "../enums/gameObjectNames";
import gsap from "gsap";
import { CustomText } from "../global/customGameObjects/customText";
import { fontEnums } from "../enums/fontEnums";

export class GamePlayScene extends Scene {
  constructor(game: Game, assets: SceneAssetsType) {
    super(game, assets);
  }

  // This function will be automatically invoked after the assets are loaded.
  start(): void {
    this.addLogo();
    this.addTitle();
  }

  addLogo() {
    const logo = new CustomSprite(
      GameObjectNames.OnAim,
      this.width / 2,
      this.height / 2
    );

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
    const title = new CustomText(
      "OnAim Pixi Starter",
      this.width / 2,
      this.height / 2 + 130
    );

    (title.style = {
      fill: "white",
      fontFamily: fontEnums.customFont_1,
    }),
      this.add(title);
  }
}
