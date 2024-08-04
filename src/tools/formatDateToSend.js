export function formatDateToSend(year, month, day, hour){
    const stringYear = year.toString();
    let stringMonth = month.toString();
    let stringDay = day.toString();

    if(stringMonth.length < 2) {
        stringMonth = "0" + stringMonth;
    }

    if(stringDay.length < 2) {
        stringDay = "0" + stringDay;
    }

    return `${stringMonth}-${stringDay}-${stringYear} ${hour}`
}

export function formatDateToSendAlt(year, month, day, hour){
    const stringYear = year.toString();
    let stringMonth = month.toString();
    let stringDay = day.toString();

    if(stringMonth.length < 2) {
        stringMonth = "0" + stringMonth;
    }

    if(stringDay.length < 2) {
        stringDay = "0" + stringDay;
    }

    return `${stringYear}-${stringMonth}-${stringDay}T${hour}.997Z`
}