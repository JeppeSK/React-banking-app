require('dotenv').config({ path: './.env' });
const express = require('express');
const cors = require('cors');
const userRoutes = require('./Routes/UserRoutes');
const API_Login = require('./Routes/API_Login');
const API_Balance = require('./Routes/API_Balance');

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
app.use('/api', API_Balance);

app.get('/', (req, res) => {
  res.send('Backend Server is running!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
