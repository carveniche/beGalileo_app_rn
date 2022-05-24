function getMaxDateForChildDOB(){
    var maxDateValue = new Date();
    var pastYear = maxDateValue.getFullYear() - 1;
    maxDateValue.setFullYear(pastYear);
    return maxDateValue;
}

function getMinDateForChildDOB(){
    var minDateValue = new Date();
    var pastYear = minDateValue.getFullYear() - 20;
    minDateValue.setFullYear(pastYear);
    return minDateValue;
}

export { getMaxDateForChildDOB,getMinDateForChildDOB }