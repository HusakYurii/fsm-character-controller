import { AbstractState } from "../fsm/AbstractState.js";
import { FallState } from "./FallState.js";

export class TurnRightState extends AbstractState {
    constructor(fsm) {
        super("TurnRightState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.turnRight();

        this.fsm.target.controls.onRightClicked = (isKeyDown) => {
            if (!isKeyDown) this.fsm.changeStateTo(new FallState(this.fsm));
        };

    }

    exit(onFinish) {
        this.fsm.target.controls.removeAllListeners();
        onFinish();
    }
}