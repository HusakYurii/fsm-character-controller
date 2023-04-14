const KEYS = {
    UP: "Space",
    DOWN: "ArrowDown",
    LEFT: "ArrowLeft",
    RIGHT: "ArrowRight"
};

export class KeyboardController {
    constructor() {
        this.onUpClicked = (isKeyDown) => { };
        this.onDownClicked = (isKeyDown) => { };
        this.onRightClicked = (isKeyDown) => { };
        this.onLeftClicked = (isKeyDown) => { };

        window.addEventListener("keydown", (event) => this._onKeyboardAction(event.code, true));
        window.addEventListener("keyup", (event) => this._onKeyboardAction(event.code, false));
    }

    removeAllListeners() {
        this.onUpClicked = (isKeyDown) => { };
        this.onDownClicked = (isKeyDown) => { };
        this.onRightClicked = (isKeyDown) => { };
        this.onLeftClicked = (isKeyDown) => { };
    }

    _onKeyboardAction(code, isKeyDown) {
        switch (code) {
            case KEYS.UP: return this.onUpClicked && this.onUpClicked(isKeyDown);
            case KEYS.DOWN: return this.onDownClicked && this.onDownClicked(isKeyDown);
            case KEYS.RIGHT: return this.onRightClicked && this.onRightClicked(isKeyDown);
            case KEYS.LEFT: return this.onLeftClicked && this.onLeftClicked(isKeyDown);
        }
    }

}