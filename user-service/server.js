const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes/user-routes');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config();

const server = express();

server.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
server.use(cookieParser());
server.use(express.json());
server.use('/api', router);

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://admin:${process.env.MONGODB_PASSWORD}@cluster0.zfdlc1j.mongodb.net/bookmarkers-users?retryWrites=true&w=majority`)
    .then(() => {
        server.listen(5000);
        console.log('Database is connected');
    })
    .catch((err) => console.log(err));
