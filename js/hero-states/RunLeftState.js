import { AbstractState } from "../fsm/AbstractState.js";

export class RunLeftState extends AbstractState {
    constructor(fsm) {
        super("RunLeftState", fsm)
    }

    enter() {
        this.fsm.target.view.runLeft();
    }

    exit(onFinish) {
        onFinish()
    }
}