const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const server = express();

server.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
server.use(cookieParser());
server.use(express.json());
server.use('/api', router);

mongoose.set('strictQuery', false);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.zfdlc1j.mongodb.net/bookmarkers-users?retryWrites=true&w=majority`)
  .then(() => {
    server.listen(process.env.SERVER_PORT);
    console.log('user-service listening on port 5000');
  })
  .catch((err) => console.log(err));
