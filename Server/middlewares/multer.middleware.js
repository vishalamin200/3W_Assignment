import multer from 'multer';
import path from 'path';


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({
    storage,
    limits: {
        fileSize: 100 * 1024 * 1024  // 100MB
    },
    fileFilter: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase()
        cb(null,true)
    }
})

export default upload