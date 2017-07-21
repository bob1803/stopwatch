"use strict";
import * as React from 'react';
import {observer} from 'mobx-react';
import {Stopwatch} from './stopwatch';
import {appState} from '../app-state';
import {CreateNewStopwatch} from './create-new-stopwatch';
@observer
export class Main extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        return (
            <div>
                {appState.stopwatchArr.map((stopwatchState, index, arr) =>
                    <Stopwatch stopwatchState={stopwatchState} key={index} appState={appState}/>)}
                <CreateNewStopwatch appState={appState}/>
            </div>)
    }
}
