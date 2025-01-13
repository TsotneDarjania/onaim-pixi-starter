import { Assets } from "pixi.js";
import { GameObjectNames } from "../enums/gameObjectNames";
import { fontEnums } from "../enums/fontEnums";

export async function loadResources() {
  await Assets.load([
    {
      alias: GameObjectNames.OnAim,
      src: "../assets/images/onaim.jpg",
      data: {
        scaleMode: "linear",
        autoGenerateMipmaps: true,
      },
    },
  ]);

  const fontFace = new FontFace(
    fontEnums.customFont_1,
    "url('../assets/fonts/custom-font.otf')"
  );
  await fontFace.load().then((loadedFont) => {
    document.fonts.add(loadedFont);
  });
}
