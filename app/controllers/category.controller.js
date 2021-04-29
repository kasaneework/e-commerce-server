const db = require("../models");
const { authJwt } = require("../middleware");
const sysUpload = require('./sysUpload.controller');
const fs = require('fs')

const Category = db.category;
const Op = db.Sequelize.Op;

// Create and Save a new Category
exports.create = function(req, res, next) {
    const files = req.files;
    const body = req.body;

    // console.log('files--', files);
    // console.log('body--', body);

    /**
     * Remember
     * upload.single => req.file  --> file no s
     * upload.array => req.files --> file + s
     */

    if (!files) {
        return res.status(404).send({ message: "Please upload a file." });
    }

    const _data = {
        cName: req.body.cName,
        cSlug: req.body.cSlug,
        cStatus: req.body.cStatus,
        cDesc: req.body.cDesc,
        cImage: files[0].filename,
    };
    // console.log('_data--', _data);

    Category.create(_data)
        .then(obj => {
            res.status(200).send({ data: obj, message: "create one Category" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Retrieve all Category from the database.
exports.findAll = (req, res) => {
    Category.findAll()
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

// Find a single Category with an id
exports.findOne = (req, res) => {
    const Id = parseInt(req.params.id);
    console.log('Id--', Id);
    if (Id && Id > 0) {
        Category.findOne({ where: { id: Id } })
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

// Update a Category by the id in the request
exports.update = function(req, res, next) {
    const Id = parseInt(req.params.id);
    // console.log('Id--', Id);
    // -----------------------
    const files = req.files;
    const body = req.body;

    /**
     * Remember
     * upload.single => req.file  --> file no s
     * upload.array => req.files --> file + s
     */
    let newImage = '';
    let oldImage = '';
    if (files.length > 0) { //--case change image
        newImage = files[0].filename
    }

    // -----------------------
    if (Id && Id > 0) {

        Category.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }

                oldImage = obj.cImage;
                //--update
                obj.cName = body.cName;
                obj.cSlug = body.cSlug;
                obj.cStatus = body.cStatus;
                obj.cDesc = body.cDesc;
                if (files.length > 0) {
                    obj.cImage = newImage;
                }
                try {
                    obj.save().
                    then(saveData => {
                            if (files.length > 0) {
                                //--remove image
                                const path = `./public/uploads/images/${oldImage}`;
                                try {
                                    fs.unlinkSync(path);
                                    console.log(`image ${imageDelete} removed!`);
                                    //file removed
                                } catch (err) {
                                    console.error(err)
                                }
                                //--end remove image
                            }

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

// Delete a Category with the specified id in the request
exports.updateStatus = (req, res, next) => {
    const Id = parseInt(req.params.id);
    const status = req.params.status;

    if (Id && Id > 0) {

        Category.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }

                //--update status
                obj.cStatus = status; //--only one field
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


// Delete One Category from the database.
exports.delete = (req, res) => {
    const Id = parseInt(req.params.id);
    // console.log('Id--', Id);
    // return;
    if (Id && Id > 0) {
        Category.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                //--old images
                let oldImage = obj.cImage;
                try {
                    obj.destroy(); //--delete record

                    const path = `./public/uploads/images/`;
                    //--remove image
                    try {
                        fs.unlinkSync(`${path}${oldImage}`);
                        console.log(`image ${oldImage} removed!`);
                    } catch (err) {
                        console.error(err)
                    }
                    //--end remove image

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

// Find all published Category
exports.findAllPublished = (req, res) => {

};