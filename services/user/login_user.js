const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const secret_key = "bce41fce62428b8347035e84051025c065b8742579dd22c29faf55f04b3cde61af4587d101c0f0e7f29fce65e8b12662dfc4365a6d6c376a06dd8e879dd444f4"

router.post('/login_user', async (req, res) => {
    try {
        const sql = `SELECT * FROM user WHERE username = ? OR email = ?`
        connection.query(sql,
            [req.body.username_email, req.body.username_email],
            (err, users) => {
                if(err) {
                    res.status(200).json({
                        status : 'error',
                        message : "error ค่าบบบบ"
                    })
                    return
                }
                if(users.length == 0) {
                    res.status(200).json({
                        status : 'not found',
                        message : "ไม่พบ"
                    })
                    return
                }
                bcrypt.compare(req.body.password, users[0].password, (err, isLogin) => {
                    if(isLogin) {
                        const token = jwt.sign({
                            id : users[0].id,
                            username : users[0].username,
                            email : users[0].email,
                            role : users[0].role
                        }, secret_key, { expiresIn : '1h' })
                        res.status(200).json({
                            status : 'login successful',
                            message : "เข้าสู่ระบบสำเร็จ",
                            token
                        })
                    } else {
                        res.status(200).json({
                            status : 'login failed',
                            message : "เข้าสู่ระบบไม่สำเร็จ"
                        })
                    }
                })
            })
    } catch (err) {
        res.status(200).json({
            message : `พัง ${err.message}`
        })
    }
})



module.exports = router