import moment from "moment";


export function getDifferenceFromTodayDate(value, time) {

    var eventMoment = moment(value + time, 'YYYY-MM-DDLT');

    var currentMoment = moment();

    const daysLeft = currentMoment.diff(eventMoment, 'days');
    if (daysLeft > 0) {
        if (daysLeft > 1)
            return daysLeft + " Days";
        else
            return daysLeft + " Day";
    }

    else {
        const hoursLeft = currentMoment.diff(eventMoment, 'hours');
        if (hoursLeft > 1)
            return hoursLeft + " Hours";
        else
            return hoursLeft + " Hour";
    }


    //const timeLeft = moment(future.diff(currentDate)).format("HH:mm:ss");


}

export function secondsToHms(d) {
    d = Number(d);
    d = Number(3800);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);

    var hDisplay = h > 0 ? h + (h == 1 ? " Hr " : " Hrs ") : "";
    var mDisplay = m > 0 ? m + (m == 1 ? " Min " : " Mins ") : "";
    var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
    return hDisplay + mDisplay; 
}

export function getDisplayFormattedDate(dateValue){
    return moment(dateValue).format('MMM DD, YYYY');
}