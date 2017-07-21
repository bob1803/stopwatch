"use strict";
import * as React from 'react';
import {observable, computed, action, useStrict, autorun} from 'mobx';
import {observer} from 'mobx-react';

@observer
export class ControlTablo extends React.Component {
    constructor(p) {
        super(p);

    }

    render() {
        const appState = this.props.appState;
        const stopwatchState = this.props.stopwatchState;
        return (<div className="btn-group stopwatch__btn-group">
            <button className="btn btn-primary" onClick={stopwatchState.isRunning ?
                appState.stopTimer.bind(appState, stopwatchState) :
                appState.startTimer.bind(appState, stopwatchState)
            }>{
                stopwatchState.isRunning ? "Стоп" : "Старт"
            }</button>
            <button className="btn btn-success" onClick={appState.saveTime.bind(appState, stopwatchState)}>Сохранить</button>
            <button className="btn btn-warning" onClick={appState.resetStopwatch.bind(appState, stopwatchState)}>Сброс
                параметров
            </button>
            {appState.stopwatchArr.length > 1 ?
                (<button className="btn btn-danger" onClick={appState.removeStopwatch.bind(appState, stopwatchState)}>Удалить
                    секундомер</button>) :
                null}
        </div>)
    }
}

