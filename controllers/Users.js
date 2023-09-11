import { response } from "express";
import User from "../models/UserModel.js";
import argon2 from "argon2";
import nodeMailer from "nodemailer";

const html = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>REGISTER JOBSEEKER Berhasil</title>
</head>
<body>
    <div style="text-align: center; padding: 50px;">
        <h1>Selamat! Pendaftaran JobSeeker Berhasil</h1>
        <p>Terima kasih atas pendaftaran Anda.</p>
        <p>Anda sekarang dapat mencari pekerjaan melalui website JobSeeker.</p>
    </div>
</body>
</html>
`;

export const getUser = async (req, res) => {
  try {
    const response = await User.findAll({
      attributes: ["uuid", "name", "email", "role"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "name", "email", "role"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createUser = async (req, res) => {
  const transporter = nodeMailer.createTransport({
    host: "mail.mejixx.my.id",
    port: 465,
    secure: true,
    auth: {
      user: "riskimeji@mejixx.my.id",
      pass: "Jelek123@",
    },
    tls: {
      rejectUnauthorized: true,
    },
  });
  const { name, email, password, confPassword } = req.body;
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password and confirm password not match" });
  const hashPassword = await argon2.hash(password);
  const validate = await User.findOne({
    attributes: ["email"],
    where: {
      email: email,
    },
  });

  if (validate !== null) {
    return res.status(400).json({
      success: false,
      msg: "email already exist",
    });
  }
  try {
    const role = "member";
    await User.create({
      name: name,
      email: email,
      password: hashPassword,
      role: role,
    });
    const smtp = await transporter.sendMail({
      from: "Register JobSeeker <riskimeji@mejixx.my.id>", // verified sender email
      to: email,
      subject: "JOBSEEKER REGISTER", // Subject line
      text: "Register Successfully", // plain text body
      html: html, // html body
    });
    res.status(201).json({
      success: true,
      msg: "Register Successfully",
      smtpMessage: smtp.messageId,
    });
    // res.status(200).json({ msg: smtp.messageId });
    // smtp.json(smtp.messageId);
    // console.log(smtp.messageId);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateUserById = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "Users not found" });
  const { name, email, password, confPassword, role } = req.body;
  let hashPassword;
  if (password === "" || !password) {
    hashPassword = user.password;
  } else {
    hashPassword = await argon2.hash(password);
  }
  if (password !== confPassword)
    return res
      .status(400)
      .json({ msg: "password and confirm password not match" });
  try {
    await User.update(
      {
        name: name,
        email: email,
        password: hashPassword,
        role: role,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "Successfully Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "Users not found" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
