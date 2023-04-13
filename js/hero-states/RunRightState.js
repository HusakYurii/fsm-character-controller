import { AbstractState } from "../fsm/AbstractState.js";

export class RunRightState extends AbstractState {
    constructor(fsm) {
        super("RunRightState", fsm)
    }

    enter() {
        this.fsm.target.view.runRight();
    }

    exit(onFinish) {
        onFinish()
    }
}