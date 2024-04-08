const jwt = require('jsonwebtoken');
const express = require('express');
const bcrypt = require('bcrypt');
const { getConnection, sql } = require('../db');
const router = express.Router();

const secret = process.env.JWT_SECRET;
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const pool = await getConnection();
        const result = await pool.request()
            .input('Email', sql.NVarChar(255), email)
            .query('SELECT * FROM EZBankingDB_Users WHERE Email = @Email');

        const user = result.recordset[0];

        if (user) {
            const passwordHash = user.PasswordHash.toString();
            const isMatch = await bcrypt.compare(password, passwordHash);
            if (isMatch) {
                
                const payload = { id: user.UserID, name: user.FirstName };

                jwt.sign(
                    payload,
                    secret,
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) throw err;
                        res.json({
                            message: "Login Successful",
                            token: "Bearer " + token
                        });
                    }
                );
            } else {
                res.status(401).json({ message: "Authentication Failed" });
            }
        } else {
            // If no user is found
            res.status(401).json({ message: "Authentication Failed" });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).send('Error during login');
    }
});

module.exports = router;