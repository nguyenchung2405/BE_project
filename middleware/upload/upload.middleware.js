const multer = require("multer");

const uploadImageSingle = () => {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./public/image/movie")
        },
        filename: (req, file, cb) => {
            cb(null, `${Date.now()}_${file.originalname}`)
        }
    });
    const upload = multer({ storage });
    return upload.single("movieAvatar");
};

module.exports = {
    uploadImageSingle
}