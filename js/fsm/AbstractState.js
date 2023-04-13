
export class AbstractState {
    constructor(name, fsm) {
        this._name = name;
        this._fsm = fsm;
    }

    get name() {
        return this._name;
    }

    get fsm() {
        return this._fsm;
    }

    enter() {
        throw new Error(`${this.constructor.name}: the enter() is not implemented`);
    }

    exit(onFinish) {
        throw new Error(`${this.constructor.name}: the exit(onFinish) is not implemented`);
    }
}
