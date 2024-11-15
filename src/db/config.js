//SQL Server DB Connection String
const config = {
    user: process.env.LOGIN_ID,
    password: process.env.PASSWORD,
    server: process.env.DB_SERVER,
    database: process.env.DATABASE,
    options: {
        appName: process.env.NPM_PACKAGE_NAME,
        trustServerCertificate: process.env.TRUST_SERVER_CERTIFICATE=="true",
        encrypt: process.env.ENCRYPT=="true",
        instancename: process.env.INSTANCE
    },
    port: parseInt(process.env.DB_PORT)
}

module.exports = config;