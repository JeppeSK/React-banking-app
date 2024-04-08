const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString: 'Driver={ODBC Driver 17 for SQL Server};Server=JEPPE\\SQLEXPRESS;Database=SQLBankingDB;Trusted_Connection=yes;',
  driver: 'msnodesqlv8',
};

// getConnection creates a connection pool to the sql database 

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