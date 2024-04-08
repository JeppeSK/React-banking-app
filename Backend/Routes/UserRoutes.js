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
            // Start a transaction
            const transaction = new sql.Transaction(pool);

            transaction.begin(async (err) => {
                if (err) {
                    throw err;
                }

                try {
                    const request = new sql.Request(transaction);
                    // Insert the user
                    let result = await request
                        .input('FirstName', sql.NVarChar(40), firstname)
                        .input('LastName', sql.NVarChar(40), lastname)
                        .input('Email', sql.NVarChar(255), email)
                        .input('PasswordHash', sql.VarBinary(sql.MAX), hashedPassword)
                        .query(`INSERT INTO EZBankingDB_Users (FirstName, LastName, Email, PasswordHash) 
                                OUTPUT INSERTED.UserID
                                VALUES (@FirstName, @LastName, @Email, @PasswordHash);`);
                    
                    // Retrieve the UserID of the inserted user
                    const userId = result.recordset[0].UserID;

                    // Create a default account for the user
                    await request
                        .input('UserID', sql.Int, userId)
                        .input('AccountType', sql.NVarChar(50), 'Checking Account')
                        .query(`INSERT INTO EZBankingDB_Accounts (UserID, AccountType, Balance) 
                                VALUES (@UserID, @AccountType, 0);`);

                    // Commit the transaction
                    transaction.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(201).send('User and account created successfully');
                    });
                } catch (error) {
                    // If there's an error, rollback the transaction
                    transaction.rollback(() => {
                        console.error('Error during user and account creation:', error);
                        res.status(500).send('Error during signup');
                    });
                }
            });
        } else {
            res.status(500).send('Error connecting to database');
        }
    } catch (error) {
        console.error('Signup error:', error);
        res.status(500).send('Error during signup');
    }
});

module.exports = router;