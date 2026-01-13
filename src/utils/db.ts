import mysql from 'mysql2/promise';

const pool = mysql.createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'db',
    waitForConnections: true,
    connectionLimit: 10
})