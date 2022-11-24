//https://hungry-rose-chipmunk.cyclic.app/allStudents
var express = require("express");

var app = express();

var data_prep = require("./data_prep.js");

var path = require("path");

const handleBars = require('express-handlebars')



app.use(express.json());

app.use(express.urlencoded({ extended: true }));



var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {

    console.log("Express http server listening on " + HTTP_PORT);

}

app.engine('.hbs', handleBars.engine({ extname: '.hbs' }));
app.set('view engine', '.hbs');




app.get("/", (req, res) => {


    res.render('home')

});



app.get("/BSD", (req, res) => {

    data_prep.bsd().then((data) => {

        res.json(data);

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/CPA", (req, res) => {

    data_prep.cpa().then((data) => {

        res.render('students', { students: data })

    }).catch((reason) => {

        res.json({ message: reason });

    });

});



app.get("/highGPA", (req, res) => {

    data_prep.highGPA().then((data) => {

        res.render('student', { data })

    });

});



app.get("/allStudents", (req, res) => {

    data_prep.allStudents().then((data) => {

        res.render('students', { students: data })

    }).catch((reason) => res.json({ message: reason }));

});



app.get("/addStudent", (req, res) => {

    res.render('addStudent')

});



app.post("/addStudent", (req, res) => {

    data_prep.addStudent(req.body).then(() => {

        var data = req.body;


        res.render('student', { data })

        //res.redirect("/allStudents");



    }).catch((reason) => res.json({ message: reason }));

});



app.get("/student/:studId", (req, res) => {

    data_prep.getStudent(req.params.studId).then((data) => {


        res.render('student', { data })

    }).catch((reason) => res.json({ message: reason }));

});



app.get("*", (req, res) => {

    res.status(404).send("Error 404: page not found.")

});



data_prep.prep().then((data) => {

    //console.log(data);

    app.listen(HTTP_PORT, onHttpStart);

}).catch((err) => {

    console.log(err);

});