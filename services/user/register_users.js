const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/users_image')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + '.png'
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload_users_image = multer({ storage: storage }) 

const bcrypt = require('bcrypt')
const saltRounds = 10

router.post('/resgister_users', upload_users_image.single('users') ,async (req, res) => {
    const date_save = new Date()
    const { username, email, password, role, fname, lastname, tel, address } = req.body
    const sql_check_username = 'SELECT COUNT(username) as count FROM user WHERE username = ?'
    const sql_check_email = `SELECT COUNT(email) as count FROM user WHERE email = ?`
    bcrypt.hash(password, saltRounds, async(err, hash) => {
        const check_username = connection.execute(sql_check_username,
            [username],
            (err, check_username, fields) => {
                if(check_username[0].count > 0) {
                    res.json({
                        status : 'error username already in use',
                        message : 'มีชื่อผู้ใช้งานแล้ว'
                    })
                } else {
                    if(req.file) {
                        const { filename: users } = req.file
                        const sql_insert_users = `INSERT INTO user (username, email, password, role, fname, lastname, tel, address, img, date_save) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
                        const insert_users = connection.execute(sql_insert_users,
                            [username, email, hash, role, fname, lastname, tel, address, users, date_save],
                            (err, insert_users) => {
                                if(err) {
                                    res.json({
                                        status : 'error register',
                                        message : 'สมัครสมาชิกไม่สำเร็จ',
                                        err : err.message
                                    })
                                } else {
                                    res.json({
                                        status :'success register',
                                        message : 'สมัครสมาชิกสำเร็จแล้ว',
                                        data : insert_users
                                    })
                                }
                            })
                    } else {
                        res.json({
                            status : 'error upload file not found',
                            message : 'ยังไม่ได้อัพโหลดรูป'
                        })
                    }
                }
            })
    })
})



module.exports = router

