import moment from 'moment';

export function mFromNow(time, format) {
    let m = moment(time);

    if(format) {
        m.format(format)
    }

    return m.fromNow();
}

export function toLocalTime(time) {
    let m = moment(time);
    return m.local().format("DD/MM/YYYY");
}