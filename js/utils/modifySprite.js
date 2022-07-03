const { Sprite } = PIXI;

/**
 * @typedef {{
 *  anchor?: {x: number; y: number};
 *  position?: {x: number; y: number};
 *  scale?: {x: number; y: number};
 *  visible?: boolean;
 * }} SpriteModifiers
 */


/**
 * 
 * @param {Sprite} sprite 
 * @param {SpriteModifiers} modifiers
 * @returns {Sprite} 
 */
export const modifySprite = (sprite, modifiers) => {
    const {
        anchor = { x: 0, y: 0 },
        position = { x: 0, y: 0 },
        scale = { x: 1, y: 1 },
        visible = true
    } = modifiers;

    sprite.anchor.copyFrom(anchor);
    sprite.position.copyFrom(position);
    sprite.scale.copyFrom(scale);
    sprite.visible = visible;
    return sprite;
};