const mongoose = require("mongoose");

// By this command all things will be loaded in process object which we were declare in environment file
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
}).then(()=> {
    console.log('Database connection successful');
})
.catch((error)=> {
    console.log("Some issues in Database connection");
    console.error(error.message);
    process.exit(1);
});
}

module.exports = dbConnect;