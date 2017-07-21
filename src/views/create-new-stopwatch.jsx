'use strict';
import * as React from 'react';
import {observer} from 'mobx-react';
import {observable, computed, action, useStrict, autorun} from 'mobx';

@observer
export class CreateNewStopwatch extends React.Component {
    constructor(p) {
        super(p);
    }

    render() {
        const appState = this.props.appState;
        return (<div className="col-sm-2">
            <button className="btn btn-success stopwatch__btn-new-stopwatch" onClick={appState.createStopwatch.bind(appState)}>
                Создать новый
            </button>
        </div>)
    }

}
