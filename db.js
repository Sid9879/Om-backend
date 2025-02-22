const mongoose = require('mongoose');
require('dotenv').config();

  const connect = ()=>{
   mongoose.connect(`mongodb+srv://${process.env.API_KEY}:${process.env.API_PASSWORD}@omagrocenter.ag5pi.mongodb.net/`)
  .then(() => console.log('Connected to database online'))
  .catch(()=>console.log('error in connecting with database'));
  }

  module.exports = connect;