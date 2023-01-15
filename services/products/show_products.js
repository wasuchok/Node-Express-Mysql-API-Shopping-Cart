
const express = require('express')
const router = express.Router()
const conection = require('../../connection/connection')



router.get('/show_products', async (req, res, next) => {
    const sql = `SELECT * FROM product`
    const show_product = await conection.execute(sql,
    (err, result, fields) => {
        res.json(result)
    })
})

module.exports = router


