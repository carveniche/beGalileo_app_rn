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

export function getClassesDateFormat(classDate) {
    if (classDate != null || classDate != "")
        return classDate.trim().split(" ");
    else
        return "";
}

export function getDayOfTheWeek() {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
}

export function secondsToHms(d) {
    console.log("Seconds to time", d);
    if (d == 0)
        return 0;
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

export function timeInHourFormat(mTime) {

    if (mTime == undefined || mTime == 0)
        return "0 Mins";
    var timeValue = "";
    var a = mTime.split(':');
    if (a[0] != "00") {
        timeValue += a[0] + " Hr"
    }
    if (a[1] != "00") {
        timeValue += " " + a[1] + " Min"
    }
    if (mTime == "00:00:00")
        timeValue = "0";
    return timeValue;

}

export function getMaxDateFromToday(days) {

    var date = new Date();
    var res = date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    date = new Date(res);
    return date;
}


function replaceAll(str, find, replace) {
    var escapedFind = find.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
    return str.replace(new RegExp(escapedFind, 'g'), replace);

}

export function getDisplayFormattedDate(dateValue) {
    return moment(dateValue).format('MMM DD, YYYY');
}

export function getValueDayOfTheWeek(day) {
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return days[day];
}
export function getValueOfMonth(month) {
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    return monthNames[month];
}

