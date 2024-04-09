require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const API_Login = require('./Routes/API_Login');
const API_Accountdetails = require('./Routes/API_Accountdetails');
const API_Creditcard_Attachment = require('./Routes/API_Creditcard_attachment');
const API_Creditcard_details = require('./Routes/GET/API_CreditCardInformation');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json());

// Use the userRoutes for '/api' endpoint
app.use('/api', userRoutes);
app.use('/api', API_Login);
app.use('/api', API_Accountdetails);
app.use('/api', API_Creditcard_Attachment);
app.use('/api', API_Creditcard_details);

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
