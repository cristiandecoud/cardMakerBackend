import express from 'express';
import { Sequelize } from 'sequelize';
import cookieParser from 'cookie-parser';
import db from './models/index.js';
import userRoutes from './routes/userRoutes.js';
import { PORT } from './config.js';
import 'dotenv/config'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

db.sequelize.sync().then(() => {
	console.log('\x1b[36m', "Database has been re sync", '\x1b[0m');
})


app.use("/api/users", userRoutes)


app.listen(PORT, () => {
  console.log('\x1b[36m', `Server is running on port ${PORT}` ,'\x1b[0m');
});
