import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { firstname, lastname, email, password, phone } = req.body;
    const foundEmail = await User.findOne({ email: email.toLowerCase() });
    if (foundEmail) {
      const error = new Error("This email is already taken");
      error.status = 409;
      throw error;
    }

    const code = Math.floor(Math.random() * 10000);

    const user = await new User({
      name: `${firstname} ${lastname}`,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      phone: phone,
      confirmationCode: code,
      status: "User",
    }).save();

    const link = `${process.env.URL}/email/verify=${user.email}code=${user.confirmationCode}`;

    const msg = {
      to: user.email,
      from: { name: process.env.MAIL_NAME, email: process.env.MAIL_ADDRESS },
      templateId: "d-2fa1cff2520e485493c4a9301045f9ac",
      dynamicTemplateData: { name: user.name, link: link },
    };
    res.status(200).json("Success! Check you email for confirmation");
    return sgMail.send(msg);
  } catch (error) {
    if (error.status) {
      res.status(error.status).json(error.message);
    } else {
      console.log(error);
      res.status(500).json("An error occured");
    }
  }
}
