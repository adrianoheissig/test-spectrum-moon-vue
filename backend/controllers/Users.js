import Users from "../models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUserInformation = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) res.status(400).json({ msg: "Id not found!" });

    const user = await Users.findAll(
      { attributes: ["id", "name", "email", "createdAt"] },
      { where: { id: userId } }
    );
    res.json(user);
  } catch (error) {
    res.status(400).json({ msg: error });
  }
};

export const Register = async (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ msg: "Password and Confirm Password do not match!" });
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  const user = await Users.findAll({ where: { email } });

  if (user.length > 0) {
    return res.status(400).json({ msg: "User already exists!" });
  }
  try {
    await Users.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.json({ msg: "Registration Successful" });
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const user = await Users.findAll({ where: { email: req.body.email } });
    const match = await bcrypt.compare(req.body.password, user[0].password);
    if (!match) {
      throw new Error();
    }

    const userId = user[0].id;

    const payload = {
      userId,
      name: user[0].name,
      email: user[0].email,
    };
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(404).json({ msg: "Email/Password not found!" });
  }
};
