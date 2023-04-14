import { AbstractState } from "../fsm/AbstractState.js";
import { IdleState } from "./IdleState.js";

export class RunLeftState extends AbstractState {
    constructor(fsm) {
        super("RunLeftState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.runLeft();

        this.fsm.target.controls.onLeftClicked = (isKeyDown) => {
            if (!isKeyDown) this.fsm.changeStateTo(new IdleState(this.fsm));
        };
    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();
        onFinish();
    }
}