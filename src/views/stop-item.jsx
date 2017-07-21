"use strict";
import * as React from 'react';
import {observer} from 'mobx-react';
import {observable, computed, action, useStrict, autorun} from 'mobx';

@observer
export class StopItem extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        let stopwatchState = this.props.stopwatchState;
        const appState = this.props.appState;
        return (<div className="col-xs-2">
            {stopwatchState.stopsCount.map((stopsTime, index) =>
                (<div className="stopwatch__stop-item" key={index}>
                    <strong className="bg-info">{stopsTime.time}</strong>
                    <button className="btn btn-danger btn-xs pull-right" onClick={
                        appState.removeStopItem.bind(appState, stopwatchState, index)
                    }>×</button>
                </div>)
            )}
        </div>)
    }
}

