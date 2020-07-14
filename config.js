require('dotenv').config();

exports.db = {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    name: process.env.DB_NAME
}

exports.app = {
    port: process.env.APP_PORT
}