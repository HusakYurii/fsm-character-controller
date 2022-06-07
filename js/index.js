const { Application, Container, AnimatedSprite, Texture, Graphics, BaseTexture, Rectangle, Sprite, TilingSprite } = PIXI;
import { assetsMap } from "./AssetsMap.js";


const WIDTH = 1000;
const HEIGHT = 600;
const app = new Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0xeae5e5,
    view: document.getElementById("canvas"),
});

app.stage.position.set(WIDTH / 2, HEIGHT / 2);
// Add to window for debugging
window["STAGE"] = app.stage;


const runGame = () => {
    const atlas = Sprite.from('adventurer');
    atlas.anchor.set(0.5, 0.5);
    app.stage.addChild(atlas);
}

assetsMap.sprites.forEach((spriteData) => app.loader.add(spriteData))
app.loader.load(runGame);