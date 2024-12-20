const { Client } = require('pg');

const client = new Client({
  host: '127.0.0.1',
  port: 5432,
  user: 'postgres',
  password: 'root',
  database: 'personalBudget',
});

client
  .connect()
  .then(() => console.log('Connected successfully'))
  .catch((err) => console.error('Connection error:', err))
  .finally(() => client.end());
