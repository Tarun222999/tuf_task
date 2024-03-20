import mysql from 'mysql2/promise'


const mySqlPool =mysql.createPool({
    host:'sql6.freesqldatabase.com',
    user:'sql6692371',
    password:'QjhNWriTgB',
    database:'sql6692371'
})

export default mySqlPool