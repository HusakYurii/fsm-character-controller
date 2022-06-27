import { createAnimatedSprite } from "../utils/createAnimatedSprite.js";
import { cutTexturesFromAtlas } from "../utils/cutTexturesFromAtlas.js";
import { modifySprite } from "../utils/modifySprite.js";

const { Container } = PIXI;

/**
 * @typedef {{
 *  baseTexture: BaseTexture;
 *  atlasData: import('../index.js').AtlasData;
 * }} HeroUIData
 */

export class HeroUI extends Container {
    /**
     * @param {HeroUIData} params 
     */
    constructor({ baseTexture, atlasData }) {
        super();

        const modifiers = {
            anchor: { x: 0.5, y: 0.5 },
            visible: false
        };

        this._idle = createAnimatedSprite({
            textures: cutTexturesFromAtlas({ startIndex: 0, endIndex: 3, baseTexture, atlasData }),
            play: false
        });
        modifySprite(this._idle, modifiers);

        this._run = createAnimatedSprite({
            textures: cutTexturesFromAtlas({ startIndex: 8, endIndex: 13, baseTexture, atlasData }),
            play: false
        });
        modifySprite(this._run, modifiers);

        this._jump = createAnimatedSprite({
            textures: cutTexturesFromAtlas({ startIndex: 14, endIndex: 23, baseTexture, atlasData }),
            play: false
        });
        modifySprite(this._jump, modifiers);

        this._fall = createAnimatedSprite({
            textures: cutTexturesFromAtlas({ startIndex: 22, endIndex: 23, baseTexture, atlasData }),
            play: false
        });
        modifySprite(this._fall, modifiers);

        this.addChild(this._idle, this._run, this._jump, this._fall);

        this._direction = 1;
        this._currentAnimation = this._idle;
    }

    idle() {
        this._switchAnimation(this._idle);
    }

    jump(cb) {
        this._switchAnimation(this._jump, false, cb);
    }

    fall() {
        this._switchAnimation(this._fall)
    }

    runLeft() {
        this._direction = -1;
        this._switchAnimation(this._run);
    }

    runRight() {
        this._direction = 1;
        this._switchAnimation(this._run);
    }

    turnLeft() {
        this._direction = -1;
        this._currentAnimation.scale.set(1 * this._direction, 1);
    }

    turnRight() {
        this._direction = 1;
        this._currentAnimation.scale.set(1 * this._direction, 1);
    }

    _switchAnimation(newAnimation, loop = true, onComplete = () => {/* */ }) {
        this._currentAnimation.visible = false;
        this._currentAnimation.stop();

        this._currentAnimation = newAnimation;
        this._currentAnimation.loop = loop;
        this._currentAnimation.onComplete = onComplete;
        this._currentAnimation.visible = true;
        this._currentAnimation.gotoAndPlay(0);
        this._currentAnimation.scale.set(1 * this._direction, 1);
    }
}