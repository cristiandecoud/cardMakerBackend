import express from "express";
import db from "../models/index.js";

const User = db.users

export const saveUser = async (req, res, next) => {
	try {
		const username = await User.findOne({
			where: {
				username: req.body.username
			},
		});
		if(username){
			return res.json(409).send("Username already exists");
		}

		const emailcheck = await User.findOne({
			where: {
				email: req.body.email,
			},
		});

   //if email exist in the database respond with a status of 409
		if (emailcheck) {
			return res.json(409).send("Authentication failed");
		}
		next();
	} catch (error) {
		console.log(error);
	}
}
