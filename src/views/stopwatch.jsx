"use strict";
import * as React from 'react';
import {observer} from 'mobx-react';
import {StopItem} from './stop-item';
import {ControlTablo} from './control-tablo';
import {Tablo} from './tablo';

@observer
export class Stopwatch extends React.Component {
    render() {
        return (
            <div className="row stopwatch__stopwatch">
                <Tablo stopwatchState={this.props.stopwatchState}/>
                <ControlTablo stopwatchState={this.props.stopwatchState} appState={this.props.appState}/>
                <StopItem stopwatchState={this.props.stopwatchState} appState={this.props.appState}/>
            </div>)
    }
}
