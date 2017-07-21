'use strict';
import * as React from 'react';
import {observer} from 'mobx-react';

@observer
export class Tablo extends React.Component {

    render() {
        const stopwatchState = this.props.stopwatchState;
        /* stopWatchModel */

        return (<div>
            <h1 className="tablo col-xs-3 stopwatch__tablo">{stopwatchState.formattedTime}</h1>
        </div>)
    }
}
