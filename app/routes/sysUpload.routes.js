const { authJwt } = require("../middleware");
const sysUpload = require('../controllers/sysUpload.controller');

module.exports = function(app) {
    //-- Uploading single file
    // app.post('/uploadfile', sysUpload.upload.single('file_one'), (req, res, next) => {
    //     const file = req.file;
    //     if (!file) {
    //         // const error = new Error('Please upload a file');
    //         // error.httpStatusCode = 400;
    //         // return next(error);
    //         res.status(400).send({ message: 'Please upload a file' });
    //     }
    //     // res.send(file);
    //     res.status(200).send({ data: file, message: "upload successfully!" });
    // });

    //-- Uploading multiple files
    app.post('/uploadmultiple', sysUpload.upload.array('files', 12), (req, res, next) => {
        console.log('files-DDDD-', req.file);
        const files = req.files;
        const body = req.body;
        console.log('files--', files);
        console.log('body--', body);
        return;
        if (!files) {
            const error = new Error('Please choose files');
            error.httpStatusCode = 400;
            return next(error);
        }
        res.send(files);
    });
};