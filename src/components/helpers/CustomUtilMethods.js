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

export function getDisplayFormattedDate(dateValue){
    return moment(dateValue).format('MMM DD, YYYY');
}