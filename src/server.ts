import { PORT } from './common/config';

const server = require('./app');

server.listen(PORT, () =>
  console.log(`App is running on http://localhost:${PORT}`)
);
