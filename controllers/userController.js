import bcrypt from "bcrypt";
import db from "../models/index.js";
import jwt from "jsonwebtoken";

const User = db.users;

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const pass = await bcrypt.hash(password, 10);
    const data = { username, email, password: pass };
    const user = await User.create(data);

    if (!user) {
      return res.json(409).send("Server error");
    }

    let token = jwt.sign({ id: user.id }, process.env.secretKey, {
      expiresIn: '1h'
    });

    res.cookie("access_token", token, {
      maxAge: 1 * 24 * 60 * 60, 
      httpOnly: false,
      // secure: process.env.NODE_ENV === 'production',
      sameSite: 'none'
    }).json(201).send({user, token});
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({
      where: { email },
    });

    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      if (isSame) {
        let token = jwt.sign(
          { id: user.id , username: user.username, email: user.email },
          process.env.secretKey,
          { expiresIn: '1h' }
        );

        res.cookie("access_token", token, {
          httpOnly: true,
          secure: false,
          sameSite: 'Lax',
        });

        console.log(token);

        return res.status(201).send({
          id: user.id,
          username: user.username,
          email: user.email
        });
      } else {
        return res.status(401).send("Authentication failed 1");
      }
    } else {
      return res.status(401).send("Authentication failed 2");
    }
  } catch (error) {
    console.log(error);
  }
};

export const users = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).send(users);
  } catch (error) {
    console.log(error);
  }
};
