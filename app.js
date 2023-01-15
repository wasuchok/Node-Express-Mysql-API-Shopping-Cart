const express = require('express')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({ extended : true}))
app.use(cors())

app.use('/products_image/', express.static('../backend/public/products_image'));
app.use('/users_image/', express.static('../backend/public/users_image'));

const show_product = require('./services/products/show_products')
app.use(`/` , show_product)

const pagination_product = require('./services/products/pagination_products')
app.use(`/` , pagination_product)

const show_categorie = require('./services/products/show_categorie')
app.use(`/` , show_categorie)

const register_users = require('./services/user/register_users')
app.use(`/` , register_users)

const show_users = require('./services/user/show_users')
app.use(`/` , show_users)

// test file upload
const upload_file_test = require('./services/testing_mode/upload_file_test')
app.use('/', upload_file_test)

const login_user = require('./services/user/login_user')
app.use('/', login_user)

const authen = require('./services/user/authen_user')
app.use('/', authen)

const show_single_user = require('./services/user/show_single_user')
app.use('/', show_single_user)


app.listen(3000)
