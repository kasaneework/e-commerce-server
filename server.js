const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
    origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// app.use(express.limit('4M'));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/************************************************* */
//-- RUN BD Migration
const db = require("./app/models");
const Role = db.role;

// ####### 1.
//--comment out and run at first time to init DB and Table after that comment it all again

// ***********************
// db.sequelize.sync({ force: true }).then(() => {
//     console.log('Drop and Resync Db');
//     initial();
// });
// function initial() {
//     //--create role default
//     Role.create({ id: 1, name: "user" });
//     Role.create({ id: 2, name: "moderator" });
//     Role.create({ id: 3, name: "admin" });
// }
// ***********************

// ####### 2.
//-- comment all no 1. and comment out no 2.
// ***********************
// db.sequelize.sync({ alter: true });
// ***********************

/************************************************* */

//---Image Upload for test upload
app.use(express.static('./public'))
app.get("/", (req, res) => {
    res.sendFile(__dirname + './index.html');
});
app.get("/product", (req, res) => {
    res.sendFile(__dirname + './product.html');
});
//==========================

// routes
require('./app/routes/auth.routes')(app);
require('./app/routes/sysUpload.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/product.routes')(app);
require('./app/routes/category.routes')(app);
require('./app/routes/banner.routes')(app);

// set port, listen for requests
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});