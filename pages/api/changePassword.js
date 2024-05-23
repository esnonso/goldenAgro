import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    const { pwd, newPwd } = req.body;
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("Invalid request, please login!");
    const user = await User.findOne({ email: session.user.email });
    const comparePwd = await bcrypt.compare(pwd, user.password);
    if (!comparePwd) throw new Error("Incorrect password");

    user.password = await bcrypt.hash(newPwd, 10);
    user.save();
    return res.status(200).json("Password Changed!");
  } catch (error) {
    return res.status(500).json(error.message);
  }
}
