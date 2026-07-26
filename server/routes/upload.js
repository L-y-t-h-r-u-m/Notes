const router = require("express").Router();
const multer = require("multer");
const cloudinary = require("../config/cloudinary");
const auth = require("../middleware/auth");

const upload = multer({
    storage: multer.memoryStorage(),
});

router.post("/", auth, upload.single("image"), async(req,res) => {
    if(!req.file){
        return res.status(400).json({
            message: "No image uploaded"
        });
    }
try{
    const result = await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
        { folder:"notes"},
    );
    
    res.status(200).json({
        url: result.secure_url,
        public_id: result.public_id,
    });
}
catch(error){
    res.status(500).json({
        message: error.message,
    });
}
});

module.exports = router;