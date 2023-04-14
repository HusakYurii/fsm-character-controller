import { AbstractState } from "../fsm/AbstractState.js";
import { FallState } from "./FallState.js";

export class TurnLeftState extends AbstractState {
    constructor(fsm) {
        super("TurnLeftState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.turnLeft();

        this.fsm.target.controls.onLeftClicked = (isKeyDown) => {
            if (!isKeyDown) this.fsm.changeStateTo(new FallState(this.fsm));
        };

    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();
        onFinish();
    }
}