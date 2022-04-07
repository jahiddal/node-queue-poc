const dbConfig = require("../config/db.config.js");
const dbMysqlConfig = require("../config/mysql.db.config.js");
const mongoose = require("mongoose");
const Sequelize = require("sequelize");
mongoose.Promise = global.Promise;

// Mongo DB
const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;
db.tutorials = require("./tutorial.model.js")(mongoose);
module.exports.db = db;


const sequelize = new Sequelize(dbMysqlConfig.db, dbMysqlConfig.username, dbMysqlConfig.password, {
    host: dbMysqlConfig.host,
    dialect: 'mysql',
    // logging: false
});
 
// Mysql DB
const dbmysql = {};
dbmysql.Sequelize = Sequelize;
dbmysql.sequelize = sequelize;
dbmysql.Tutorial = require("./mysql.tutorial.model.js")(sequelize, Sequelize);
module.exports.dbmysql = dbmysql;
