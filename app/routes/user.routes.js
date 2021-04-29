const { verifySignUp, authJwt } = require("../middleware");
// const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");
const authController = require("../controllers/auth.controller");

const apiPath = 'user';
//--/api/product

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //---------------------
    app.get("/api/users", controller.allAccess);
    app.get("/api/test/user", [authJwt.verifyToken], controller.userBoard);
    app.get("/api/test/mod", [authJwt.verifyToken, authJwt.isModerator], controller.moderatorBoard);
    app.get("/api/test/admin", [authJwt.verifyToken, authJwt.isAdmin], controller.adminBoard);
    //--------------------

    //--normal
    app.get(`/api/${apiPath}`, controller.findAll); //--get all
    app.get(`/api/${apiPath}/:id`, controller.findOne); //--get one

    //-- authController
    app.post(`/api/${apiPath}/create`, [verifySignUp.checkDuplicateUsernameOrEmail, verifySignUp.checkRolesExisted], authController.signup); //--create new

    //--admin role
    app.get(`/api/admin`, [authJwt.verifyToken, authJwt.isAdmin], controller.findAllAdmin); //--get all admin
    app.get(`/api/${apiPath}/public/:id/:status`, [authJwt.verifyToken, authJwt.isAdmin], controller.updateStatus); //--update status
    app.put(`/api/${apiPath}/:id`, [authJwt.verifyToken, authJwt.isAdmin], controller.update); //--update 
    app.delete(`/api/${apiPath}/:id`, [authJwt.verifyToken, authJwt.isAdmin], controller.delete); //--delete one

};