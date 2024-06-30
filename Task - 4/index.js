const express = require('express')
const dotenv = require('dotenv')
const dbConnect = require('./config/database.js')
const PORT = process.env.PORT || 3000;

dotenv.config();

const router = require('./controller/routes.js');

const app = express();

app.use(express.json());
app.use('/api/v1', router);

dbConnect();

app.listen(PORT, () => {
    console.log(`Server started successfully! ${PORT}`)
})