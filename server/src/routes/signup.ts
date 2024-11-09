import express, { Request, Response } from "express";

import { BadRequestError, validateRequest } from "@vb430/common";
import { body } from "express-validator";
import Jwt from "jsonwebtoken";
import { User } from "../models/user";

const route = express.Router();

//#Misake: Not using / in begining of the route which made me to spend lots of time to understand why i am not able to reach to the route
route.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be Valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
    body("name")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 to 20 characters"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password, name });

    await user.save();

    //generate JWT
    const userJWT = Jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_KEY!
    );
    //store it in session
    req.session = {
      jwt: userJWT,
    };

    res.status(201).send({ user });
  }
);

export { route as SignUpRouter };
