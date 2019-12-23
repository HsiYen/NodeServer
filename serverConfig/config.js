let app = {
  user: 'sa',
  password: '123456',
  server: 'localhost',
  database: 'dt_EnterpriseBenefit',
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