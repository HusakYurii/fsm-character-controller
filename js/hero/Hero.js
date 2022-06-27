import { HeroUI } from './HeroUI.js';

export class Hero {
    /**
     * 
     * @param {import('./HeroUI.js').HeroUIData} params 
     */
    constructor(params) {
        this.view = new HeroUI(params);
    }
}