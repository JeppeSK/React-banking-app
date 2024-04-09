const jwt = require('jsonwebtoken');
const express = require('express');
const { getConnection, sql } = require('../../db');
const router = express.Router();

// Ensure you have your secret key that was used to sign the JWTs
const secret = process.env.JWT_SECRET;

router.get('/user/account/creditcard/details', async (req, res) => {
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
      .query(`SELECT SerialNumber, CVV, ExpiryDate FROM EZBankingDB_CreditCards WHERE accountID = @UserID`);

    if (result.recordset.length === 0) {
      return res.status(404).json({ error: 'User not found or no creditcard details available' });
    }

    const serialNumber = result.recordset[0].SerialNumber;
    const cvv = result.recordset[0].CVV;
    const expiryComponents = result.recordset[0].ExpiryDate.toISOString().split('T')[0].split('-');
    const month = expiryComponents[1];
    const day = expiryComponents[2];

    res.json({ serialNumber, cvv, expiryDate: `${month}-${day}`});
  } catch (error) {
    console.error('Error fetching creditcard details:', error);

    // Provide more specific error messages based on the caught error
    if (error.name === 'TokenExpiredError' || error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid or expired token' });
    } else {
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
});

module.exports = router;