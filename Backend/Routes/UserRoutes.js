const express = require('express');
const bcrypt = require('bcrypt');
const { getConnection, sql } = require('../db');
const router = express.Router();

// Necessary saltRounds for bcrypt, these are used to generate a strong encrypted password.
// In other words, SaltRounds determines the amount of iterations the algorithm will run through when generating the hashed password. 
const saltRounds = 10;

// Helper function to generate a random number with n digits
// This is to generate a REG number for the account together with the Account Number.
const generateRandomNumber = (n) => {
    const min = Math.pow(10, n - 1);
    const max = Math.pow(10, n) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// This API route, sends a request to the server with the inputs the user has provided when registering on the page.
// If all goes well, the server will return the transaction, ensuring that both the user and the bank account has been registered.
router.post('/signup', async (req, res) => {
    const { firstname, lastname, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const pool = await getConnection();

        if (pool) {
            // We start a new transaction because we want to ensure that both the user and the bank account have been registered.
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

                    const userId = result.recordset[0].UserID;

                    // Generate unique registration and account numbers with the helper function seen at the top of the document called generateRandomNumber
                    const registrationNumber = generateRandomNumber(4).toString();
                    const accountNumber = generateRandomNumber(10).toString();

                    // Create a default account for the User, the AccountType will be hard-coded at first, but the user can choose to change this value later on,
                    // to any other AccountType available, for example "Savings Account"
                    
                    await request
                        .input('UserID', sql.Int, userId)
                        .input('RegistrationNumber', sql.NVarChar(4), registrationNumber)
                        .input('AccountNumber', sql.NVarChar(10), accountNumber)
                        .input('AccountType', sql.NVarChar(50), 'Checking Account')
                        .query(`INSERT INTO EZBankingDB_Accounts (UserID, RegistrationNumber, AccountNumber, AccountType, Balance) 
                                VALUES (@UserID, @RegistrationNumber, @AccountNumber, @AccountType, 0);`);

                    transaction.commit((err) => {
                        if (err) {
                            throw err;
                        }
                        res.status(201).send('User and account created successfully');
                    });
                } catch (error) {
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