const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString: process.env.CONNECTION_STRING,
  driver: 'msnodesqlv8',
};

const getConnection = async () => {
  try {
    const pool = new sql.ConnectionPool(config);
    await pool.connect();
    console.log('Connected to the database.');
    return pool;
  } catch (error) {
    console.error('Database Connection Failed!', error);
    return null;
  }
};

module.exports = {
  getConnection,
  sql
};