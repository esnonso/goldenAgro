import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    const { newPwd, email, code } = req.body;
    if (!newPwd || !email || !code) throw new Error("Invalid request!");
    await connectDatabase();
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Invalid request!");
    if (user.confirmationCode !== code) throw new Error("Invalid request!");

    user.password = await bcrypt.hash(newPwd, 10);
    user.confirmationCode = "";
    user.save();
    return res.status(200).json("Password Change success!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
