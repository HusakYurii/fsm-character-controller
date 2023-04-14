import { AbstractState } from "../fsm/AbstractState.js";
import { IdleState } from "./IdleState.js";

export class RunLeftState extends AbstractState {
    constructor(fsm) {
        super("RunLeftState", fsm);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    enter() {
        window.addEventListener("keyup", this._onKeyDown);

        this.fsm.target.view.runLeft();
    }

    exit(onFinish) {
        window.removeEventListener("keyup", this._onKeyDown);

        onFinish()
    }

    _onKeyDown(event) {
        if (event.code === "ArrowLeft") {
            this.fsm.changeStateTo(new IdleState(this.fsm));
        }
    }
}