const { authJwt } = require("../middleware");
const sysUpload = require('../controllers/sysUpload.controller');
const fs = require('fs');

module.exports = function(app) {

    //-- Uploading multiple files
    // app.post('/uploadmultiple', (req, res, next) => {
    app.post('/uploadmultiple', sysUpload.upload.array('files', 12), (req, res, next) => {
        // app.post('/uploadmultiple', sysUpload.upload.array('file_many', 12), (req, res, next) => {

        const files = req.files;
        console.log('files--', files);
        return;

        // const filexx = req.body.fileSource;
        // const base64data = filexx.content.replace('/^data:.*,/', '');
        // fs.writeFile(userFiles + filexx.name, base64data, 'base64', (err) => {
        //     if (err) {
        //         console.log(err);
        //         res.sendStatus(500);
        //     } else {
        //         res.set('Location', userFiles + filexx.name);
        //         res.status(200);
        //         res.send(filexx);
        //     }
        // });

        // let base64String = req.body.fileSource;
        // console.log('base64String--', base64String);
        // // let base64Image = base64String.split(';base64,').pop();


        // var buff = Buffer.from(base64String, 'base64');
        // console.log('buf--', buff);
        // fs.writeFileSync('stack-abuse-logo-out.jpg', buff);
        // console.log('Base64 image data converted to file: stack-abuse-logo-out.jpg');


        // fs.writeFile('image.png', base64Image, { encoding: 'base64' }, function(err) {
        //     console.log('File created');
        // });
        return;

        // const encoded = req.files.buffer.toString("base64");
        // console.log('encoded--', encoded);

        // const files = req.files;
        // const body = req.body;
        // console.log('files--', files);
        // console.log('body--', body);

        // return;
        // console.log('req.files--', req.files);
        // const files = req.files;
        // if (!files) {
        //     // const error = new Error('Please choose files');
        //     // error.httpStatusCode = 400;
        //     // return next(error);
        //     res.status(400).send({ message: 'Please upload a file' });
        // }
        // // res.send(files);
        // res.status(200).send({ data: files, message: "upload successfully!" });
    });
};