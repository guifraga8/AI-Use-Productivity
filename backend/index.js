require('dotenv').config();
const express = require('express');
const cors = require('cors');
const challengeRoutes = require('./routes/challenge');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', challengeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
