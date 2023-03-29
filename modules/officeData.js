class Data {
    employees;
    classes;
    constructor(employees, classes) {
        this.employees = employees;
        this.classes = classes;
    }
}

const fs = require('fs');
var dataCollection = null;

module.exports.initialize = function() {
    var p = new Promise(function(resolve, reject) {
        fs.readFile('./data/employees.json', 'utf8', function(err, employeeData) {
            if (err) {
                reject("Unable to read employees.json!" + err);
                return;
            }
            fs.readFile('./data/classes.json', 'utf8', function(err, classData) {
                if (err) {
                    reject("Unable to read classes.json!");
                    return;
                }
                dataCollection = new Data(JSON.parse(employeeData), JSON.parse(classData)) // successful action
                resolve("Successfully read the files.");
            });
        });
    })
    return p;
}

//This function will provide the full array of "employee" objects using the resolve method of the returned promise.
module.exports.getAllEmployees = function() {
    return new Promise(function(resolve, reject) {
        if (dataCollection.employees.length != 0) {
            resolve(dataCollection.employees);
        } else {
            reject("No results returned!");
        }
    })
}

module.exports.getEAs = function() {
    var EAEmployeeArray = [];
    return new Promise(function(resolve, reject) {
        if (dataCollection.employees.length != 0) {
            for (var i = 0; i < dataCollection.employees.length; i++) {
                if (dataCollection.employees[i].EA == true) {
                    EAEmployeeArray.push(dataCollection.employees[i])
                    resolve(EAEmployeeArray);
                }
            }
        } else {
            reject("No results returned!")
        }
    })
}

module.exports.getClasses = function() {
    return new Promise(function(resolve, reject) {
        if (dataCollection.classes.length != 0) {
            resolve(dataCollection.classes);
        } else {
            reject("No results returned!");
        }

    })
}

module.exports.getPartTimes = function() {
    var partTimeEmployeeArray = [];
    return new Promise(function(resolve, reject) {
        if (dataCollection.employees.length != 0) {
            for (var i = 0; i < dataCollection.employees.length; i++) {
                if (dataCollection.employees[i].status == "Part Time") {
                    partTimeEmployeeArray.push(dataCollection.employees[i]);
                    resolve(partTimeEmployeeArray);
                }
            }
        } else {
            reject("No results returned!");
        }
    })
}

module.exports.getEmployeeByNum = function(num) {
    var p = new Promise((resolve, reject) => {
        for (var i = 0; i < dataCollection.employees.length; i++) {
            if (dataCollection.employeeData[i].employees == num) {
                resolve(dataCollection.employees[i].firstName + dataCollection.employees[i].lastName);
                return;
            }
        }
        reject("no results returned.");
        return;
    })
}