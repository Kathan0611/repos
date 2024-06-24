const mongoose = require("mongoose");
require("dotenv").config();
const connect = ()=>{
    //  console.log(process.env.DATABASE_URL)
    mongoose.connect(`${process.env.DATABASE_URL}`).then(()=>{
      console.log('Database connected successfully');
    }).catch(err=>console.log(err.message))
}
module.exports = connect;
