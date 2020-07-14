require('dotenv').config();

exports.database = {
    name:       process.env.DB_USER,
    password:   process.env.DB_PASS,
    collection: process.env.DB_DATABASE
}

exports.app = {
    port: process.env.APP_PORT
}