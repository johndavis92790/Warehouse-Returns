const mysql = require('mysql2');
const express = require('express');
const PORT = process.env.PORT || 3001;
const path = require('path');
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static('./test-htmls'));
app.use(require('./controllers'));
const sequelize = require('./config/connection');

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
  });