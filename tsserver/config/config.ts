export const pgDbConfig = {
    host:'localhost',
    database:'spandan',
    user:'postgres',
    password:'Nithish@2000',
    port:5432,
    max:40,//max no of client in the pool
    idleTimeoutMillis: 30000,
}

export const JWT_SECRET_KEY = require('crypto').randomBytes(32).toString('hex');

