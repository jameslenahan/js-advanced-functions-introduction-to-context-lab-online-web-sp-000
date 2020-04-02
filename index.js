let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

function findEmployeeByFirstName(allEmployees, firstName){
    return allEmployees.find((employee) => {
        return employee.firstName === firstName
    })
}

function createEmployeeRecord(employeeArray){
    
    let employee = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function calculatePayroll(allEmployees){

    const allWagesFor = function(){
        //this = employee record
        return this.timeOutEvents.reduce( (allEmployeeWages, event) => {
            return allEmployeeWages + wagesEarnedOnDate.call(this, event.date)
        }, 0)
    }    
    
    return allEmployees.reduce( (totalWages, employee) => {
        return totalWages + allWagesFor.call(employee)
    }, 0);
}

function wagesEarnedOnDate(dateStamp){
    return hoursWorkedOnDate.call(this, dateStamp) * this.payPerHour
}

function hoursWorkedOnDate(dateStamp){
    //#this = event object
    
    const findByDate = (event) => { return event.date === dateStamp };
    const getHourFromDate = function() { return this.find(findByDate).hour };
    
    const inTime = getHourFromDate.call(this.timeInEvents);
    const outTime = getHourFromDate.call(this.timeOutEvents);

    return (outTime - inTime) / 100;
}

function createEmployeeRecords(allEmployees){
    return allEmployees.map( (employee) => { 
        return createEmployeeRecord.call(this, employee); 
    });
}

function createEvent(type, dateStamp){

    const [date, hour] = dateStamp.split(" ");

    return {
        type: type,
        hour: parseInt(hour),
        date: date
    }
}

function createTimeInEvent(dateStamp){
    this.timeInEvents.push(createEvent("TimeIn", dateStamp))
    return this   
}

function createTimeOutEvent(dateStamp){
    this.timeOutEvents.push(createEvent("TimeOut", dateStamp))
    return this
}