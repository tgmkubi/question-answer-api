const multer = require('multer');
const path = require('path');
const asyncErrorWrapper = require('express-async-handler');
const CustomError = require('../../helpers/error/CustomError');

// Storage, FileFilter
const storage = multer.diskStorage({
    destination: function (req, file, cb) {

        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/uploads"));
    },
    filename: function (req, file, cb) {
        // File - Mimetype
        const extension = file.mimetype.split("/")[1];
        req.savedProfiledImage = "image_" + req.user.id + Date.now() + "." + extension;
        cb(null, req.savedProfiledImage);
    }
});

function fileFilter(req, file, cb) {

    let allowedMimeTypes = ["image/jpg", "image/gif", "image/jpeg", "image/png"];

    // To reject this file pass `false`, like so:
    if(!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new CustomError("Please provide a valid image file", 400), false);
    }

    // To accept the file pass `true`, like so:
    return cb(null, true);
}

const profileImageUpload = multer({storage, fileFilter});

module.exports = profileImageUpload;