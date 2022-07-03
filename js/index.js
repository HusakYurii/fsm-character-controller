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

const KEYS = {
    UP: "Space",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
};

const validatorFactory = (array) => {
    return (value) => array.includes(value)
};

const runGame = () => {
    const baseTexture = BaseTexture.from('adventurer');

    const hero = new Hero({
        atlasData,
        baseTexture
    });

    hero.view.scale.set(2);
    hero.view.idle();
    app.stage.addChild(hero.view);

    window["STAGE"] = app.stage;
    window["HERO"] = hero;

    let isJumping = false;
    const keysClicked = [];
    const isValidKey = validatorFactory(Object.values(KEYS));
    const hasKey = validatorFactory(keysClicked);

    // create something to control the character
    window.addEventListener("keydown", (e) => {
        if (!isValidKey(e.code) || hasKey(e.code)) {
            return;
        }
        keysClicked.push(e.code);

        switch (e.code) {
            case (KEYS.UP):
                hero.view.jump(() => {
                    hero.view.fall();
                });
                isJumping = true;
                break;
            case (KEYS.DOWN):
                console.log("Sit down")
                break;
            case (KEYS.LEFT):
                if (isJumping) {
                    hero.view.turnLeft();
                } else {
                    hero.view.runLeft();
                }
                break;
            case (KEYS.RIGHT):
                if (isJumping) {
                    hero.view.turnRight();
                } else {
                    hero.view.runRight();
                }
                break;
            default:
                throw new Error("WTF!?")
        }
    })

    window.addEventListener("keyup", (e) => {
        if (!hasKey(e.code)) {
            return;
        }
        keysClicked.splice(keysClicked.indexOf(e.code), 1);

        switch (e.code) {
            case (KEYS.UP):
                isJumping = false;
                break;
            case (KEYS.DOWN):
                break;
            case (KEYS.LEFT):
                if (!isJumping) {
                    hero.view.idle();
                }
                break;
            case (KEYS.RIGHT):
                if (!isJumping) {
                    hero.view.idle();
                }
                break;
            default:
                throw new Error("WTF!?")
        }

    })
}

assetsMap.sprites.forEach((spriteData) => app.loader.add(spriteData))
app.loader.load(runGame);