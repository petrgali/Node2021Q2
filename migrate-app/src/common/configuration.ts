export default () => ({
    server: {
        port: parseInt(process.env.PORT, 10) || 3000,
    },
    database: {
        host: process.env.POSTGRES_HOST,
        port: Number(process.env.POSTGRES_PORT),
        username: process.env.POSTGRES_USER,
        password: process.env.POSTGRES_PASSWORD,
        database: process.env.POSTGRES_DB,
    },
});