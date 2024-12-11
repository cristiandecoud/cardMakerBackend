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
      expiresIn: 1 * 24 * 60 * 60, // 24 hours
    });

    res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });

    return res.json(201).send(user);
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    //find a user by their email
    const user = await User.findOne({
      where: {
        email,
      },
    });

    console.log(user);
    //if user email is found, compare password with bcrypt
    if (user) {
      const isSame = await bcrypt.compare(password, user.password);
      //if password is the same
      //generate token with the user's id and the secretKey in the env file
      if (isSame) {
        let token = jwt.sign(
          { id: user.dataValues.id },
          process.env.secretKey,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );

        //if password matches wit the one in the database
        //go ahead and generate a cookie for the user
        res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        console.log("user", JSON.stringify(user, null, 2));
        console.log(token);
        //send user data
        return res.status(201).send(user);
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
