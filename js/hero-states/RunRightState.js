import { AbstractState } from "../fsm/AbstractState.js";
import { IdleState } from "./IdleState.js";

export class RunRightState extends AbstractState {
    constructor(fsm) {
        super("RunRightState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.runRight();

        this.fsm.target.controls.onRightClicked = (isKeyDown) => {
            if (!isKeyDown) this.fsm.changeStateTo(new IdleState(this.fsm));
        };
    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();

        onFinish();
    }
}