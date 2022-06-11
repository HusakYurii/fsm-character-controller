const { Texture, Rectangle } = PIXI;

/**
 * @typedef {{
 * startIndex: number;
 * endIndex: number;
 * baseTexture: BaseTexture;
 * atlasData: {
 *  column: number;
 *  row: number;
 *  tile: {
 *      width: number;
 *      height: number;
 *  }
 * }
 * }} DataToCutTextures
 */

/**
 * 
 * @param {DataToCutTextures} params 
 * @returns {Textures[]}
 */
export const cutTexturesFromAtlas = (params) => {
    const { startIndex, endIndex, baseTexture, atlasData } = params;

    const textures = [];

    for (let i = startIndex; i <= endIndex; i++) {
        const column = i % atlasData.columns;
        const row = Math.floor(i / atlasData.columns);
        const x = column * atlasData.tile.width;
        const y = row * atlasData.tile.height;
        const region = new Rectangle(x, y, atlasData.tile.width, atlasData.tile.height);
        textures.push(new Texture(baseTexture, region));
    }
    return textures;
};