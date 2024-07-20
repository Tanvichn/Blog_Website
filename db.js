
const mongoose = require('mongoose');
let DB_URL = 'mongodb://0.0.0.0:27017/BlogWebsite';
const db = (async () => {
    try {
     await mongoose.connect(DB_URL, {});
    console.log('Database Connected'); 
    }catch (error){
        console.log(error);
    }
})();

module.exports = db;

// const MongoClient = require("mongodb").MongoClient;
// const url = "mongodb://localhost:27017/BlogWebsite";

// const dbName = "BlogWebsite";
// let db2;

// MongoClient.connect(
// "mongodb://localhost:27017/BlogWebsite",
//  { useNewUrlParser: true,
//     useUnifiedTopology: true
//   },
//   (err, client) => {
//     if (err) return console.log(err);

//   db2 = client.db2(dbName);
//    console.log(`Connected MongoDB: ${url}`);
//    console.log(`Database: ${dbName}`);
//   }
// );

// module.exports = db2;