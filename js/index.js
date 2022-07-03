const { Application, Container, AnimatedSprite, Texture, Graphics, BaseTexture, Rectangle, Sprite, TilingSprite } = PIXI;
import { cutTexturesFromAtlas } from "./utils/cutTexturesFromAtlas.js";
import { createAnimatedSprite } from "./utils/createAnimatedSprite.js";
import { assetsMap } from "./AssetsMap.js";
import { modifySprite } from "./utils/modifySprite.js";
import { Hero } from "./hero/Hero.js";

/**
 * @typedef {{
 * columns: number;
 * rows: number;
 * width: number;
 * height: number;
 * tile: {
 *   width: number;
 *   height: number;
 * }
 * }} AtlasData
 */

const WIDTH = 1000;
const HEIGHT = 600;
const app = new Application({
    width: WIDTH,
    height: HEIGHT,
    backgroundColor: 0xeae5e5,
    view: document.getElementById("canvas"),
});

app.stage.position.set(WIDTH / 2, HEIGHT / 2);

// Let's add the config data describing atlas
/**
 * @typeof AtlasData
 */
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

const runGame = () => {
    const baseTexture = BaseTexture.from('adventurer');

    const atlas = new Sprite(new Texture(baseTexture));
    atlas.position.set(-WIDTH / 2, -HEIGHT / 2);
    app.stage.addChild(atlas);

    const hero = new Hero({
        atlasData,
        baseTexture
    });

    hero.view.scale.set(2);
    app.stage.addChild(hero.view);

    window["STAGE"] = app.stage;
    window["HERO"] = hero;
}

assetsMap.sprites.forEach((spriteData) => app.loader.add(spriteData))
app.loader.load(runGame);