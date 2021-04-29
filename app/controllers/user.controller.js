const db = require("../models");
const { authJwt } = require("../middleware");
const fs = require('fs')

const User = db.user;
const Role = db.role;
const Op = db.Sequelize.Op;

//================
// Retrieve all Banner from the database.
exports.findAll = (req, res) => {
    User.findAll({
            include: [{
                model: Role,
                where: {
                    id: {
                        [Op.not]: 3 //--3 is admin
                    }
                },
                required: true //--true is INNOR JOIN | false is LEFT JOIN
            }]
        })
        .then(obj => {
            if (!obj) {
                return res.status(404).send({ message: "Data Not found." });
            }
            res.status(200).send({ data: obj, message: "All Categories" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.findAllAdmin = (req, res) => {
    User.findAll({
            include: [{
                model: Role,
                where: {
                    id: 3 //--3 is admin
                },
                required: true //--true is INNOR JOIN | false is LEFT JOIN
            }]
        })
        .then(obj => {
            if (!obj) {
                return res.status(404).send({ message: "Data Not found." });
            }
            res.status(200).send({ data: obj, message: "All Categories" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};
//================

// Find a single Banner with an id
exports.findOne = (req, res) => {
    const Id = parseInt(req.params.id);
    console.log('Id--', Id);
    if (Id && Id > 0) {
        User.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                res.status(200).send({
                    data: obj,
                    message: "Obj found"
                });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    } else {
        res.status(500).send({ message: "id must have value!" });
    }
};

// Update a Banner by the id in the request
exports.update = function(req, res, next) {
    const Id = parseInt(req.params.id);
    const body = req.body;

    // -----------------------
    if (Id && Id > 0) {

        User.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                //--update
                obj.firstname = body.firstname;
                obj.lastname = body.lastname;
                obj.phone = body.phone;
                obj.email = body.email;
                obj.status = body.status;
                try {
                    obj.save().
                    then(saveData => {
                            res.status(200).send({ data: saveData, message: "Update success!" });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });

                } catch (error) {
                    res.status(500).send({ message: error.message });
                }
                //-------------
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    } else {
        res.status(500).send({ message: "id must have value!" });
    }
};

// Delete a Banner with the specified id in the request
exports.updateStatus = (req, res, next) => {
    const Id = parseInt(req.params.id);
    const status = req.params.status;

    if (Id && Id > 0) {

        User.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }

                //--update status
                obj.status = status; //--only one field
                try {
                    obj.save().
                    then(saveData => {
                            res.status(200).send({ data: saveData, message: "Update success!" });
                        })
                        .catch(err => {
                            res.status(500).send({ message: err.message });
                        });

                } catch (error) {
                    res.status(500).send({ message: error.message });
                }
                //-------------
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    } else {
        res.status(500).send({ message: "id must have value!" });
    }

};


// Delete One Banner from the database.
exports.delete = (req, res) => {
    const Id = parseInt(req.params.id);
    // console.log('Id--', Id);
    // return;
    if (Id && Id > 0) {
        User.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                try {
                    obj.destroy(); //--delete record
                    res.status(200).send({ data: '', message: "Delete success!" });
                } catch (error) {
                    res.status(500).send({ message: error.message });
                }
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });

    } else {
        res.status(500).send({ message: "id must have value!" });
    }

    // await jane.destroy();
    // Now this entry was removed from the database
};

// ---------------------------------
exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
};
// ---------------------------------