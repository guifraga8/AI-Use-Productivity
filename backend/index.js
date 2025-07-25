require('dotenv').config();
const express = require('express');
const cors = require('cors');
const systemRoutes = require('./routes/system');
const developerRoutes = require('./routes/developer');
const challengeRoutes = require('./routes/challenge');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

app.use('/api', systemRoutes);
app.use('/api', developerRoutes);
app.use('/api', challengeRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Servidor rodando na porta ${process.env.PORT}`);
});
