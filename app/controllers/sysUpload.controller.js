var multer = require('multer');
var fs = require('fs');

// SET STORAGE
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // cb(null, 'uploads')
        cb(null, './public/uploads/images');
    },
    filename: function(req, file, cb) {
        // console.log('file.fieldname-aaa-', file.fieldname);

        cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split(".")[1]);
        // cb(null, file.fieldname + '-' + Date.now());
    }
});
// var upload = multer({ storage: storage });
exports.upload = multer({ storage: storage });