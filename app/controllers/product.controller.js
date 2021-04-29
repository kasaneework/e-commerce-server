const db = require("../models");
const { authJwt } = require("../middleware");
const sysUpload = require('./sysUpload.controller');
const fs = require('fs')

const Product = db.product;
const Op = db.Sequelize.Op;

// Create and Save a new Product
exports.create = function(req, res, next) {
    const files = req.files;
    const body = req.body;
    let imageArr = [];
    let pImages_join = '';

    // console.log('files--', files);
    // console.log('body--', body);

    /**
     * Remember
     * upload.single => req.file  --> file no s
     * upload.array => req.files --> file + s
     */

    if (!files) {
        return res.status(404).send({ message: "Please upload a file." });
    } else {
        files.forEach((value) => {
            imageArr.push(value.filename);
        });
        pImages_join = imageArr.join(',');
        console.log('pImages_join--', pImages_join);
    }

    console.log('imageArr--', imageArr);
    const _data = {
        pName: req.body.pName,
        pSlug: req.body.pSlug,
        pStatus: req.body.pStatus,
        pCategory: req.body.pCategory,
        pQty: req.body.pQty,
        pPrice: req.body.pPrice,
        pPriceSale: req.body.pPriceSale,
        pDesc: req.body.pDesc,
        pSize: req.body.pSize,
        pColor: req.body.pColor,
        pStar: req.body.pStar,
        pImageDefault: imageArr[0],
        pImages: pImages_join,
        pSpecification: req.body.pSpecification
    };
    // console.log('_data--', _data);
    Product.create(_data)
        .then(obj => {
            res.status(200).send({ data: obj, message: "create one products" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Retrieve all Product from the database.
exports.findAll = (req, res) => {
    Product.findAll()
        .then(obj => {
            if (!obj) {
                return res.status(404).send({ message: "Data Not found." });
            }
            res.status(200).send({ data: obj, message: "All products" });
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

// Find a single Product with an id
exports.findOne = (req, res) => {
    const Id = parseInt(req.params.id);
    console.log('Id--', Id);
    if (Id && Id > 0) {
        Product.findOne({ where: { id: Id } })
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

// Update a Product by the id in the request
exports.update = function(req, res, next) {
    const Id = parseInt(req.params.id);
    // console.log('Id--', Id);

    // -----------------------
    const files = req.files;
    const body = req.body;
    let imageArr = [];
    let pImages_join = '';

    /**
     * Remember
     * upload.single => req.file  --> file no s
     * upload.array => req.files --> file + s
     */

    if (files) { //--case add more image
        //--new images
        // console.log('files--', files);
        files.forEach((img) => {
            imageArr.push(img.filename);
            // console.log('newImages--', img.filename);
        });
    }
    //--old images
    let oldImage = body.pImages.split(',');
    // console.log('oldImage--', oldImage);
    oldImage.forEach(img => {
        if (img) {
            imageArr.push(img);
        }
    });
    // console.log('imageArr--', imageArr);

    pImages_join = imageArr.join(',');
    // console.log('pImages_join--', pImages_join);
    // return;

    // -----------------------
    if (Id && Id > 0) {

        Product.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                //--update
                obj.pName = body.pName;
                obj.pSlug = body.pSlug;
                obj.pStatus = body.pStatus;
                obj.pCategory = body.pCategory;
                obj.pQty = body.pQty;
                obj.pPrice = body.pPrice;
                obj.pPriceSale = body.pPriceSale;
                obj.pDesc = body.pDesc;
                obj.pSize = body.pSize;
                obj.pColor = body.pColor;
                // obj.pStar = body.pStar;
                obj.pImageDefault = body.pImageDefault;
                obj.pImages = pImages_join; //--join all new and old
                obj.pSpecification = body.pSpecification;

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

// Delete a Product with the specified id in the request
exports.deleteImage = (req, res, next) => {

    const Id = parseInt(req.params.id);
    const imageDelete = req.params.imagename;

    // console.log('Id--', Id);
    // console.log('imageDelete--', imageDelete);

    let imageArr = [];
    let pImages_join = '';

    // return;

    if (Id && Id > 0) {

        Product.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                //--old images
                let oldImage = obj.pImages.split(',');
                oldImage.forEach(img => {
                    if (img && img != imageDelete) { //--all old image but not delete image
                        // console.log('img-aa-', img);
                        imageArr.push(img);
                    }
                });
                pImages_join = imageArr.join(',');
                // console.log('imageArr--', imageArr);
                // return;

                //--update images
                obj.pImages = pImages_join; //--only one field
                try {
                    obj.save().
                    then(saveData => {
                            //--remove image
                            const path = `./public/uploads/images/${imageDelete}`;
                            try {
                                fs.unlinkSync(path);
                                console.log(`image ${imageDelete} removed!`);
                                //file removed
                            } catch (err) {
                                console.error(err)
                                    // res.status(500).send({ message: err.message });
                            }
                            //--end remove image

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

// Delete a Product with the specified id in the request
exports.updateStatus = (req, res, next) => {

    const Id = parseInt(req.params.id);
    const status = req.params.status;

    if (Id && Id > 0) {

        Product.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }

                //--update status
                obj.pStatus = status; //--only one field
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


// Delete One Product from the database.
exports.delete = (req, res) => {
    const Id = parseInt(req.params.id);
    // console.log('Id--', Id);
    // return;
    if (Id && Id > 0) {
        Product.findOne({ where: { id: Id } })
            .then(obj => {
                if (!obj) {
                    return res.status(404).send({ message: "Obj Not found." });
                }
                //--old images
                let oldImage = obj.pImages.split(',');
                try {
                    obj.destroy(); //--delete record

                    const path = `./public/uploads/images/`;
                    oldImage.forEach(img => {
                        //--remove image
                        try {
                            fs.unlinkSync(`${path}${img}`);
                            console.log(`image ${img} removed!`);
                        } catch (err) {
                            console.error(err)
                        }
                        //--end remove image
                    });
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

// Find all published Product
exports.findAllPublished = (req, res) => {

};