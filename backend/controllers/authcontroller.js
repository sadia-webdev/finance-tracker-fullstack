import { generateToken } from "../utils/generateToken.js";
import User from "../models/User.js";

// register new user
export const register = async (req, res, next) => {
  try {
    let { name, email, password, role, profilePicture } = req.body;
    email = email.toLowerCase();

    const exist = await User.findOne({ email });

    if (exist) {
      return res
        .status(401)
        .json({ message: "this email is already being used " });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      profilePicture,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      message: "user created successfuly",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    next(error);
  }
};

// login
export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    email = email.toLowerCase();

    const user = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "incorect  email or password" });
    }

    const token = generateToken(user._id);

    user.password = undefined;

    res.status(200).json({ message: "logged successfuly", token, user });
  } catch (error) {
    next(error);
  }
};


