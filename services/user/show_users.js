const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')

router.get('/show_users', async (req, res) => {
    const sql = `SELECT * FROM user`
    const show_users = await connection.execute(sql, 
        (err, result) => {
            if(err) {
                res.json({  status : 'error', message : err })
                return
            }
            res.json(result)
        })
})

module.exports = router