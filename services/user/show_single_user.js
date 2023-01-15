const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')


router.get('/show_single_user/:id', async (req, res) => {

    try {
        const sql = `SELECT * FROM user WHERE id = ?`
        connection.execute(sql,
            [req.params.id],
            (err, result) => {
                if(err) {
                    res.status(401).json({
                        status : 'error',
                        message : err.message
                    })
                    return
                }
                res.status(200).json({
                    status : 'ok',
                    data : result
                })
            })
    } catch (err) {
        res.status(404).json({
            error : err.message
        })
    }
})

module.exports = router