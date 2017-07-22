"use strict";
import {observable, computed, action, useStrict, autorun} from 'mobx';
import formatTime from './lib/format-time';

useStrict(true);

class AppState {

    @observable
    stopwatchArr = [];

    @action
    deleteStopwatch = (index) => {
        this.stopwatchArr.splice(index, 1);
    };

    @action
    setTime = (stopwatchState, timeRec) => {
        this.stopwatchArr[this.stopwatchArr.indexOf(stopwatchState)].time = timeRec;
    };

    @action
    createStopwatch({time: time = 0,
                    timeStart: timeStart = 0,
                    running: running = false,
                    lastStopTime: lastStopTime = 0,
                    stopsCount: stopsCount = []} = {}) {

        let stopwatchState = {

            @observable
            time: time,

            @observable
            timeStart: timeStart,

            @computed
                get formattedTime() {
                    return formatTime(this.time);
                },

            @observable
            intervalId: null,

            @observable
            running: running,

            @computed
                get isRunning() {
                    return this.running;
                },

            @observable
            lastStopTime: lastStopTime,

            @computed
                get getLastStopTime() {
                    return this.lastStopTime;
                },

            @observable
            stopsCount: stopsCount
        };
        this.stopwatchArr.push(stopwatchState);
    };

    @action
    initialStopwatch() {
        if (!localStorage.arrStopwatchObj) {
            this.createStopwatch();
        } else {
            try {
                let stopwatchArrJSON = JSON.parse(localStorage.arrStopwatchObj);
                stopwatchArrJSON.map((obj) => {
                    this.createStopwatch({time: obj.time,
                        timeStart: obj.timeStart,
                        running: obj.running,
                        lastStopTime: obj.lastStopTime,
                        stopsCount: obj.stopsCount});
                });
                this.stopwatchArr.map((obj) => {
                    if (obj.isRunning) {
                        this.startTimer(obj);
                    }
                });
            } catch (err) {
                console.log("Произошла ошибка при попытке загрузить предыдущие данные" + err.message);
                this.createStopwatch();
            }
        }
    }

    @action
    startTimer(stopwatchState) {
        if (stopwatchState.isRunning) {//проверка для запуска из localeStorage

        } else if (stopwatchState.getLastStopTime === 0) {
            stopwatchState.timeStart = Date.now();
        } else {
            stopwatchState.timeStart = Date.now() - stopwatchState.getLastStopTime - 250;
        }
        stopwatchState.running = true;
        stopwatchState.intervalId = setInterval(() => {
            let timeCurrent = Date.now() - stopwatchState.timeStart;
            this.setTime(stopwatchState, timeCurrent);
        }, 100);
    }

    @action
    stopTimer(stopwatchState) {
        stopwatchState.lastStopTime = stopwatchState.time;
        clearInterval(stopwatchState.intervalId);
        stopwatchState.intervalId = null;
        stopwatchState.running = false;
    }

    @action
    saveTime(stopwatchState) {
        stopwatchState.stopsCount.push({
            time: stopwatchState.formattedTime
        });
    }

    @action
    resetStopwatch(stopwatchState) {
        if (stopwatchState.isRunning) {
            clearInterval(stopwatchState.intervalId);
            stopwatchState.running = false;
        }
        stopwatchState.timeStart = 0;
        stopwatchState.time = 0;
        stopwatchState.lastStopTime = 0;
        stopwatchState.intervalId = null;
        stopwatchState.stopsCount = [];
    }

    @action
    removeStopItem(stopwatchState, indexStopItem) {
        let index = this.stopwatchArr.indexOf(stopwatchState);
        this.stopwatchArr[index].stopsCount.splice(indexStopItem, 1);
    }

    @action
    removeStopwatch(stopwatchState) {
        clearInterval(stopwatchState.intervalId);
        stopwatchState.intervalId = null;
        this.deleteStopwatch(this.stopwatchArr.indexOf(stopwatchState));
    }
}

export const appState = new AppState();

    appState.initialStopwatch();

