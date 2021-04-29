const { authJwt } = require("../middleware");
const controller = require("../controllers/category.controller");
const sysUpload = require('../controllers/sysUpload.controller');

const apiPath = 'category';
//--/api/product

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //--normal
    app.get(`/api/${apiPath}`, controller.findAll); //--get all
    app.get(`/api/${apiPath}/:id`, controller.findOne); //--get all
    app.post(`/api/${apiPath}`, sysUpload.upload.array('images', 12), [authJwt.verifyToken, authJwt.isAdmin], controller.create); //--create new


    //--admin role
    app.get(`/api/${apiPath}/public/:id/:status`, [authJwt.verifyToken, authJwt.isAdmin], controller.updateStatus); //--update status
    app.put(`/api/${apiPath}/:id`, sysUpload.upload.array('images', 12), [authJwt.verifyToken, authJwt.isAdmin], controller.update); //--update 
    app.delete(`/api/${apiPath}/:id`, [authJwt.verifyToken, authJwt.isAdmin], controller.delete); //--delete one

};