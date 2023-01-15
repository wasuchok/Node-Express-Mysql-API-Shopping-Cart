const express = require('express')
const router = express.Router()
const conection = require('../../connection/connection')

router.get('/show_categorie', async (req, res) => {
    const sql = `SELECT * FROM category`
    const show_categorie = await conection.execute(sql,
    (err, result, fields) => {
        res.json(result)
    })
})

module.exports = router