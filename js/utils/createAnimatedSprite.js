const { AnimatedSprite, Texture } = PIXI;
/**
 * @typedef {{
 *  textures: Texture[];
 *  animationSpeed?: number;
 *  play?: boolean;
 * }} AnimatedSpriteData
 */


/**
 * 
 * @param {AnimatedSpriteData} params
 * @returns {AnimatedSprite}
 */
export const createAnimatedSprite = (params) => {

    const {
        textures,
        animationSpeed = textures.length / 60,
        play = true,
    } = params;
    const sprite = new AnimatedSprite(textures);
    sprite.animationSpeed = animationSpeed;
    play && sprite.play();
    return sprite;
}