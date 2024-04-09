const jwt = require('jsonwebtoken');
const express = require('express');
const { getConnection, sql } = require('../db');
const router = express.Router();

const secret = process.env.JWT_SECRET;

router.post('/account/creditcard_attachment', async (req, res) => {
    // Extract and convert to string the credit card details from the request body
    const { serialNumber, cvv, expiryDate } = req.body;

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
            .query(`SELECT AccountID FROM EZBankingDB_Accounts WHERE UserID = @UserID`);
      
          if (result.recordset.length === 0) {
            return res.status(404).json({ error: 'User not found or no account balance available' });
          }

          const accountID = result.recordset[0].AccountID
          console.log(accountID);

        // If the account exists, proceed to insert the credit card
        let insertQuery = `
        INSERT INTO EZBankingDB_CreditCards (AccountID, SerialNumber, CVV, ExpiryDate)
        VALUES (@accountID, @serialNumber, @cvv, @expiryDate);
    `;
    
    const insertResult = await pool.request()
        .input('accountID', sql.Int, accountID)  // Ensure this line is included to bind the accountID
        .input('serialNumber', sql.NVarChar, serialNumber)
        .input('cvv', sql.NVarChar, cvv)
        .input('expiryDate', sql.Date, expiryDate)
        .query(insertQuery);

        if (insertResult.rowsAffected[0] > 0) {
            res.status(201).send('Credit card registered successfully');
        } else {
            throw new Error('Failed to register credit card');
        }
    } catch (error) {
        console.error('Error registering credit card:', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;