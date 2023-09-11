import nodeMailer from "nodemailer";
import Subs from "../models/SubscriptionModel.js";
import Users from "../models/UserModel.js";
import { response } from "express";

const html = `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SUBSCRIPTION JOBSEEKER</title>
</head>
<body>
    <div style="text-align: center; padding: 50px;">
        <h1>Selamat! Pendaftaran JobSeeker Berhasil</h1>
        <p>Terima kasih atas pendaftaran Anda.</p>
        <p>Anda Akan Mendapatkan Info Segera Mengenai Lowongan Pekerjaan Terbaru.</p>
    </div>
</body>
</html>
`;
export const getSubscription = async (req, res) => {
  try {
    const response = await Subs.findAll({
      attributes: ["uuid", "name", "email"],
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const getSubscriptionById = async (req, res) => {
  try {
    const response = await Subs.findOne({
      attributes: ["uuid", "name", "email"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
export const createSubscription = async (req, res) => {
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
  const { name, email } = req.body;

  const validasi = await Subs.findOne({
    attributes: ["email"],
    where: {
      email: email,
    },
  });

  if (validasi !== null) {
    return res.status(400).json({
      success: false,
      msg: "email already exist",
    });
  }

  if (name === null || email == null)
    return res.status(400).json({
      success: false,
      msg: "name and email can't be null",
    });
  try {
    await Subs.create({
      name: name,
      email: email,
    });
    const smtp = await transporter.sendMail({
      from: "Subscription JobSeeker <riskimeji@mejixx.my.id>", // verified sender email
      to: email,
      subject: "JOBSEEKER SUBSCRIPTION", // Subject line
      text: "Register Successfully", // plain text body
      html: html, // html body
    });
    res.status(201).json({
      success: true,
      msg: "Subscription Successfully",
      smtpMessage: smtp.messageId,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const updateSubscriptionById = async (req, res) => {
  const subscription = await Subs.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!subscription)
    return res.status(404).json({
      success: false,
      msg: "Subscription not found",
    });
  const { name, email } = req.body;

  if (name || email)
    return res.status(400).json({
      success: false,
      msg: "name and email can't be null",
    });
  try {
    await Subs.update(
      {
        name: name,
        email: email,
      },
      {
        where: {
          id: subscription.id,
        },
      }
    );
    res.status(200).json({
      success: true,
      msg: "Successfully Updated",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export const deleteSubscription = async (req, res) => {
  const subscription = await Subs.findOne({
    where: {
      uuid: req.params.id,
    },
  });
  if (!subscription)
    return res.status(404).json({
      success: false,
      msg: "Subscription not found",
    });
  try {
    await Subs.destroy({
      where: {
        id: subscription.id,
      },
    });
    res.status(200).json({
      success: true,
      msg: "Subscription Deleted",
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
