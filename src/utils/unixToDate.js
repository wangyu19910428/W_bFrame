/*
* unix 时间戳
* type 返回时间类型，精确到天还是秒，默认：天，detail为秒
* */


export default function unixToDate (unix, type) {
    var _unix;
    if (typeof unix === 'number') {
        _unix = unix.toString().length === 10? unix * 1000: unix;
    } else if (unix === 'string') {
        _unix = unix.length === 10? parseInt(unix) * 1000: parseInt(unix);
    }
    var _date = new Date(_unix);
    var _year = _date.getFullYear();
    var _month = _date.getMonth() + 1;
    var _day = _date.getDate();
    var _hour = _date.getHours();
    var _minute = _date.getMinutes();
    var _second = _date.getSeconds();
    return type === 'detail'? `${_year}-${addZero(_month)}-${addZero(_day)} ${addZero(_hour)}:${addZero(_minute)}:${addZero(_second)}`: `${_year}-${addZero(_month)}-${addZero(_day)}`
}

function addZero (num) {
    return parseInt(num) < 10 ? '0'+num: num
}