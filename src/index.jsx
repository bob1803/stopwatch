"use strict";
import * as ReactDom from 'react-dom';
import {Main} from './views/main';
import * as React from 'react';
import {appState} from './app-state'


(() => {
    const appNode = document.getElementById('stopwatch0');
    ReactDom.render(<Main />, appNode)
})();


window.addEventListener("unload", () => {
    let arrStopwatchObj = [];
    appState.stopwatchArr.map((obj) => {
        let objState = {
            time: obj.time,
            timeStart: obj.timeStart,
            running: obj.running,
            lastStopTime: obj.lastStopTime,
            stopsCount: obj.stopsCount
        };
        arrStopwatchObj.push(objState);
    });
    let stopwatchJSON = JSON.stringify(arrStopwatchObj);
    localStorage.setItem("arrStopwatchObj", stopwatchJSON);
});
