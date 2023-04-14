import { AbstractState } from "../fsm/AbstractState.js";
import { JumpState } from "./JumpState.js";
import { RunLeftState } from "./RunLeftState.js";
import { RunRightState } from "./RunRightState.js";

export class IdleState extends AbstractState {
    constructor(fsm) {
        super("IdleState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.idle();

        this.fsm.target.controls.onRightClicked = (isKeyDown) => {
            if (isKeyDown) this.fsm.changeStateTo(new RunRightState(this.fsm));
        };

        this.fsm.target.controls.onLeftClicked = (isKeyDown) => {
            if (isKeyDown) this.fsm.changeStateTo(new RunLeftState(this.fsm));
        };

        this.fsm.target.controls.onUpClicked = (isKeyDown) => {
            if (isKeyDown) this.fsm.changeStateTo(new JumpState(this.fsm));
        };

    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();
        onFinish();
    }
}