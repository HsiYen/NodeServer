let app = {
  user: 'sa',
  password: '',
  server: 'localhost',
  database: 'database',
  port: '',
  options: {
    encrypt: true // Use this if you're on Windows Azure
  },
  pool: {
    min: 0,
    max: 10,
    idleTimeoutMillis: 3000
  }
};

module.exports = app;
