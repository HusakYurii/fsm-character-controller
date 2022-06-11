const { Application, Container, AnimatedSprite, Texture, Graphics, BaseTexture, Rectangle, Sprite, TilingSprite } = PIXI;
import { cutTexturesFromAtlas } from "./utils/cutTexturesFromAtlas.js";
import { createAnimatedSprite } from "./utils/createAnimatedSprite.js";
import { assetsMap } from "./AssetsMap.js";
import { modifySprite } from "./utils/modifySprite.js";


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

// Let's add the config data describing atlas
const atlasData = {
    columns: 7,
    rows: 11,
    width: 350,
    height: 407,
    tile: {
        width: 350 / 7,
        height: 407 / 11
    }
};

window["atlasData"] = atlasData;

const runGame = () => {
    const baseTexture = BaseTexture.from('adventurer');

    const atlas = new Sprite(new Texture(baseTexture));
    atlas.position.set(-WIDTH / 2, -HEIGHT / 2);
    app.stage.addChild(atlas);

    const idleAnimation = createAnimatedSprite({
        textures: cutTexturesFromAtlas({ startIndex: 0, endIndex: 3, baseTexture, atlasData }),
    });
    modifySprite(idleAnimation, { scale: { x: 2, y: 2 } });
    app.stage.addChild(idleAnimation);

    const runLeftAnimation = createAnimatedSprite({
        textures: cutTexturesFromAtlas({ startIndex: 43, endIndex: 49, baseTexture, atlasData }),
    });

    modifySprite(runLeftAnimation, { scale: { x: 2, y: 2 }, position: { x: 100, y: 0 } });
    app.stage.addChild(runLeftAnimation);
}

assetsMap.sprites.forEach((spriteData) => app.loader.add(spriteData))
app.loader.load(runGame);