import { AbstractState } from "../fsm/AbstractState.js";
import { FallState } from "./FallState.js";

export class JumpState extends AbstractState {
    constructor(fsm) {
        super("JumpState", fsm);
    }

    enter() {
        this.fsm.target.hero.view.jump(() => {
            this.fsm.changeStateTo(new FallState(this.fsm));
        });
    }

    exit(onFinish) {
        onFinish();
    }
}