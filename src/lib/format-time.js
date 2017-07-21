'use strict';

export default function formatTime(time) {
    let getMsec = function (time) {
        time = time%1000;
        time = time.toString();
        if (time == "0") {
            return "000";
        } else if (time.length == 1) {
            return "00" + time;
        } else if (time.length ==2 ) {
            return "0" + time;
        } else {
            return time
        }
    };
    let msec = getMsec(time);
    let sec = (Math.floor( (time/1000)%60 ) < 10) ? "0" + Math.floor( (time/1000)%60 ) : Math.floor( (time/1000)%60 );
    let minutes = (Math.floor( (time/60000)%60 ) < 10) ? "0" + Math.floor( (time/60000)%60 ) : Math.floor( (time/60000)%60 );
    let hours = (Math.floor( (time/3600000)%24 ) < 10) ? "0" + Math.floor( (time/3600000)%24 ) : Math.floor( (time/3600000)%24 ) ;
    return  hours + ":" + minutes + ":" + sec + ":" + msec;
}

export function helper() {

}
