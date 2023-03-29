var HTTP_PORT = process.env.PORT || 8080;
var express = require("express");
var app = express();
const path = require('path')
var server = require("./modules/officeData.js");

app.get("/PartTimer", (req, res) => {
    server.getPartTimers()
        .then(function(data) {
            res.json(data);
        })
        .catch(function() {
            res.status(404).send("No Result!");
        })
});

// Returns the html code from the home.html file located within the views directory
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/home.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/home.html"));
});

app.get("/audio.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/audio.html"));
})

app.get("/video.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/video.html"));
})

app.get("/list.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/list.html"));
})

app.get("/table.html", (req, res) => {
    res.sendFile(path.join(__dirname, "/views/table.html"));
})

app.get("/employee/:employeeNum", (req, res) => {
    server.getEmployeeByNum(req.params.employeeNum)
        .then(function(data) {
            res.json(data);
        })
        .catch(function() {
            res.status(404).send("No Result!");
        })
})


// app.use cannot be moved before the above app.get()s...
app.use((req, res) => {
    res.status(404).send("Page Not Found!");
})


// setup http server to listen on HTTP_PORT
server.initialize()
    .then(function() {
        app.listen(HTTP_PORT, () => {
            console.log("server listening on port: " + HTTP_PORT)
        });
    })
    .catch(function(err) {
        console.log("Not able to start the server: " + err);
    })