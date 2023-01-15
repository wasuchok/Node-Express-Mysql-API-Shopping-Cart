
const express = require('express')
const router = express.Router()
const connection = require('../../connection/connection')

router.get('/pagination_products', (req, res) => {
    const itemsPerPage = 10
    const page = parseInt(req.query.page) || 1;
    const offset = (page - 1) * itemsPerPage;
  
    connection.query('SELECT COUNT(*) as count FROM product', (error, results) => {
      if (error) {
        res.json(error);
      } else {
        const totalPages = Math.ceil(results[0].count / itemsPerPage);
        connection.query('SELECT * FROM product LIMIT ?, ?', [offset, itemsPerPage], (error, results) => {
          if (error) {
            res.json(error);
          } else {
            res.json({ 'totalPages' : totalPages, 'data': results});
          }
        });
      }
    });
  });

module.exports = router