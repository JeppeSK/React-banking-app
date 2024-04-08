const jwt = require('jsonwebtoken');
const express = require('express');
const { getConnection, sql } = require('../db');
const router = express.Router();

// Ensure you have your secret key that was used to sign the JWTs
const secret = process.env.JWT_SECRET;

router.get('/account/balance', async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(401).json({ error: 'No authorization token provided' });
    }

    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, secret);

    if (!decoded || !decoded.id) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const userId = decoded.id;

    const pool = await getConnection();
    const result = await pool.request()
      .input('UserID', sql.Int, userId)
      .query(`SELECT Balance FROM EZBankingDB_Accounts WHERE UserID = @UserID`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found or no account balance available' });
    }

    const balance = result.recordset[0].Balance;
    res.json({ balance });
  } catch (error) {
    console.error('Error fetching balance:', error);

    // Provide more specific error messages based on the caught error
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;