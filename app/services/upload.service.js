const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const uploadService = multer({ storage });

module.exports = uploadService;