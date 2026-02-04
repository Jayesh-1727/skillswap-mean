const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('SkillSwap API is running');
});

const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

module.exports = app;
