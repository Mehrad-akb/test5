var fs = require("fs");

const Sequelize = require('sequelize');
var sequelize = new Sequelize('vxjaybiq', 'vxjaybiq', '7pofy7lg8Eigsld5RZ8q6moRIdv3sRZi', {
    host: 'peanut.db.elephantsql.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    },
    query: { raw: true }
});

var Student = sequelize.define('Student', {
    StudId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: Sequelize.STRING,
    program: Sequelize.STRING,
    gpa: Sequelize.FLOAT

});



exports.prep = () => {


    return new Promise((resolve, reject) => {

        sequelize.sync().then(() => {
            resolve()
        }).catch(err => { reject("unable to sync the database") })

    });

};



exports.bsd = () => {
    return new Promise((resolve, reject) => {

        Student.findAll({
            where: {
                program: "BSD"
            }
        }).then(data => {
            resolve(data)
        }).catch(err => reject("no results returned"))
    });
}





exports.cpa = () => {

    return new Promise((resolve, reject) => {

        Student.findAll({
            where: {
                program: "CPA"
            }
        }).then(data => {
            resolve(data)
        }).catch(err => reject("no results returned"))
    });

}

exports.highGPA = () => {

    return new Promise((resolve, reject) => {

        let high = 0;

        let highStudent;
        Student.findAll().then(data => {
            for (let i = 0; i < data.length; i++) {

                //console.log(students[i].gpa, high);

                if (data[i].gpa > high) {

                    high = data[i].gpa;

                    highStudent = data[i];

                }

            }

            (highStudent) ? resolve(highStudent) : reject("Failed finding student with highest GPA");

        }).catch(err => {
            reject("Failed finding student with highest GPA")
        })




    });

};



exports.lowGPA = () => {
    return new Promise((resolve, reject) => {

        let low = 4.0;

        let lowStudent;

        Student.findAll().then(data => {

            for (let i = 0; i < data.length; i++) {

                if (data[i].gpa < low) {

                    low = data[i].gpa;

                    lowStudent = data[i];

                }

            }

            resolve(lowStudent);
        }).catch(err => { reject("no results returned") })


    })
}



exports.allStudents = () => {

    return new Promise((resolve, reject) => {
        Student.findAll().then(data => {
            resolve(data)
        }).catch(err => reject('no results returned'))
    })

}



exports.addStudent = (stud) => {

    return new Promise((resolve, reject) => {

        Student.create({
            StudId: stud.studId,
            name: stud.name,
            program: stud.program,
            gpa: stud.gpa
        }).then(() => {
            resolve()
        }).catch(err => reject("unable to add the student"))
    });

}



exports.getStudent = (studId) => {


}

