const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/upload_test')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage }) 


router.post('/upload_file_test', upload.single('users'), async(req, res) => {
    if(!req.file) {
        res.json("Upload file failed")
    } else {
        res.json(req.file)
        
    }
   
         
})



module.exports = router
