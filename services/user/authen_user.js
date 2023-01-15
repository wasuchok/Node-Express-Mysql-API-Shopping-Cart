const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')
const jwt = require('jsonwebtoken')

const secret_key = "bce41fce62428b8347035e84051025c065b8742579dd22c29faf55f04b3cde61af4587d101c0f0e7f29fce65e8b12662dfc4365a6d6c376a06dd8e879dd444f4"

router.get('/authen', async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, secret_key)
        res.status(200).json({
            status : 'ok',
            decoded
        })
    } catch (err) {
        res.status(200).json({
            status : 'time out',
            err
        })
    }
})

module.exports = router