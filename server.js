const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const {connectDatabase} = require('./config/database');

connectDatabase();

app.use(cors());
app.use(express.json());
app.use('/api/user', require('./routes/userRoute'));
app.use('/api/product', require('./routes/productRoute'));
app.use('/api/order', require('./routes/orderRoute'));
app.use('/api/cart', require('./routes/cartRoute'));

app.listen(8080);