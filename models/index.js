import { Sequelize, DataTypes } from 'sequelize';
import userModel from './userModel.js';

const sequelize = new Sequelize({
  username: "postgres",
  password: "Mandibula1",
  database: "auth",
  host: "localhost",
  port: 5432,
  dialect: "postgres",
});

sequelize.authenticate().then(() => {
  console.log('\x1b[36m', "Connection has been established successfully." ,'\x1b[0m');
}).catch((error) => {
  console.log('\x1b[31m', "Unable to connect to the database: " ,'\x1b[0m', error);
});

const db = {};
db.sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = userModel(sequelize, DataTypes);

//exporting the module
export default db;