import { AbstractState } from "../fsm/AbstractState.js";
import { RunLeftState } from "./RunLeftState.js";
import { RunRightState } from "./RunRightState.js";

export class IdleState extends AbstractState {
    constructor(fsm) {
        super("IdleState", fsm);

        this._onKeyDown = this._onKeyDown.bind(this);
    }

    enter() {
        window.addEventListener("keydown", this._onKeyDown);

        this.fsm.target.view.idle();
    }

    exit(onFinish) {
        window.removeEventListener("keydown", this._onKeyDown);
        onFinish();
    }

    _onKeyDown(event) {
        if (event.code === "ArrowLeft") {
            this.fsm.changeStateTo(new RunLeftState(this.fsm));
        }
        else if (event.code === "ArrowRight") {
            this.fsm.changeStateTo(new RunRightState(this.fsm));
        }
    }
}