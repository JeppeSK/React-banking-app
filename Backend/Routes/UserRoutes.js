const express = require('express');
const bcrypt = require('bcrypt');
const { getConnection, sql } = require('../db'); 
const router = express.Router();

const saltRounds = 10; 

router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const pool = await getConnection();
        if (pool) {
            await pool.request()
                .input('FirstName', sql.NVarChar(40), firstname)
                .input('LastName', sql.NVarChar(40), lastname)
                .input('Email', sql.NVarChar(255), email)
                .input('PasswordHash', sql.VarBinary(sql.MAX), hashedPassword) 
                .query(`INSERT INTO EZBankingDB_Users (FirstName, LastName, Email, PasswordHash) 
                        VALUES (@FirstName, @LastName, @Email, @PasswordHash);`);

            res.status(201).send('User created successfully');
        } else {
            res.status(500).send('Error connecting to database');
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error during signup');
    }
});

module.exports = router;