require('dotenv').config()
const MongoClient = require("mongodb").MongoClient;
// const settings = require("./settings");
// const mongoConfig = settings.mongoConfig;


console.log(process.env.SERVER_URL, '\n\n\n')
let _connection = undefined;
let _db = undefined;

module.exports = async () => {
  if (!_connection) {
    try{
    // _connection = await MongoClient.connect(mongoConfig.serverUrl, {useNewUrlParser: true, useUnifiedTopology:true});
    // _db = await _connection.db(mongoConfig.database);
    _connection = await MongoClient.connect(process.env.SERVER_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    _db = await _connection.db(process.env.DATABASE);
    }
    catch(Exception) {
      console.log(Exception,'\n\n\n')
    }
  }

  return _db;
};