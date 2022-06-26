/* Your Code Here */
let createEmployeeRecord = function(arr) {
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: [],
    }
}

let createEmployeeRecords = function(mainArr) {
    return mainArr.map(function(arr){
        return createEmployeeRecord(arr)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10), date
    })
    return this
}

let createTimeOutEvent = function(dateStamp) {
    let [date, hour] = dateStamp.split(" ")

    this.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10), date,
    })
    return this
}

let hoursWorkedOnDate = function(newDate){
    let inTime = this.timeInEvents.find(function(e){
        return e.date === newDate
    })

    let outTime = this.timeOutEvents.find(function(e){
        return e.date === newDate
    })

    return (outTime.hour - inTime.hour) / 100
}

let wagesEarnedOnDate = function(newDate) {
    let wage = hoursWorkedOnDate.call(this, newDate) * this.payPerHour
    return parseFloat(wage.toString())
}

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(arr1, firstName) {
    return arr1.find(function(r){
        return r.firstName === firstName
    })
}
let calculatePayroll = function(recordsArr){
    return recordsArr.reduce(function(memo, r){
        return memo + allWagesFor.call(r)
    }, 0)
}
