import express from 'express';
import { register, login, users } from '../controllers/userController.js';
import { saveUser} from '../middlewares/userAuth.js';

const router = express.Router();

router.post("/register", saveUser, register);

router.post("/login", login);

router.get("/", (req, res) => {
	res.json(200).send("Hello World");
});

router.get("/users", users);

export default router;