const mysql2 = require('mysql2')

const conection = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'project'
})

conection.connect((err) => {
    if (err) {
        console.log('Error Connecting to Mysql Server: ' + err.message)
        return
    }
    console.log('Connected to Mysql Server')
})

module.exports = conection;