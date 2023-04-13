export class StateMachine {
    constructor(target) {
        this._target = target;
        this._currentState = undefined;
        this._previousState = undefined;
    }

    get target() {
        return this._target;
    }

    get currentState() {
        return this._currentState;
    }

    get previousState() {
        return this._previousState;
    }

    changeStateTo(nextState) {
        const onExitFinished = () => {
            nextState.enter();
            this._previousState = this.currentState;
            this._currentState = nextState;
            this._log(this._currentState, this._previousState);
        };

        if (this._currentState) {
            this._currentState.exit(onExitFinished);
        } else {
            onExitFinished();
        }
    }

    _log(currState, previousState) {
        console.log(
            `%c State was change!
            previous state: ${previousState && previousState.name}
            current state: ${currState && currState.name}`,
            'color: white; background: black; font-size: 15px'
        );
    }
}


