export default () => ({
  server: {
    port: parseInt(String(process.env['PORT']), 10) || 3000,
    adapter: process.env['USE_FASTIFY'],
  },
  database: {
    host: process.env['POSTGRES_HOST'],
    port: Number(process.env['POSTGRES_PORT']),
    username: process.env['POSTGRES_USER'],
    password: process.env['POSTGRES_PASSWORD'],
    database: process.env['POSTGRES_DB'],
  },
  secret: process.env['JWT_SECRET_KEY'],
});
