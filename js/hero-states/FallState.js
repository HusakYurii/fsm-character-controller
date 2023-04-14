import { AbstractState } from "../fsm/AbstractState.js";
import { TurnLeftState } from "./TurnLeftState.js";
import { TurnRightState } from "./TurnRightState.js";

export class FallState extends AbstractState {
    constructor(fsm) {
        super("FallState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.fall();

        this.fsm.target.controls.onRightClicked = (isKeyDown) => {
            if (isKeyDown) this.fsm.changeStateTo(new TurnRightState(this.fsm));
        };

        this.fsm.target.controls.onLeftClicked = (isKeyDown) => {
            if (isKeyDown) this.fsm.changeStateTo(new TurnLeftState(this.fsm));
        };

    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();
        onFinish();
    }
}