import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      const error = new Error("Email does not exist");
      error.status = 404;
      throw error;
    }
    const code = Math.floor(Math.random() * 10000);
    user.confirmationCode = code;
    const updatedUser = await user.save();
    const link = `${process.env.URL}/forgot-password/verify=${user.email}code=${updatedUser.confirmationCode}`;
    const msg = {
      to: user.email,
      from: { name: process.env.MAIL_NAME, email: process.env.MAIL_ADDRESS },
      templateId: "d-f74515e56e434837affae2292c0715fa",
      dynamicTemplateData: { name: user.name, link: link },
    };

    res
      .status(200)
      .json("Success! Check you email for your password reset link");
    return sgMail.send(msg);
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
