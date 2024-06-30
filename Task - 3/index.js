const express = require('express');
const cron = require('node-cron');

const PORT = 3000;

const app = express();

cron.schedule("* * * * *", Print);

app.listen(PORT, () => {
    console.log(`Server Started Successfully! ${PORT}`);
})


function Print() {
    console.log("Hello World!")
}