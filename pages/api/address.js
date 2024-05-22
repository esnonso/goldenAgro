import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { address } = req.body;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("An error occured");
    user.address = address;
    await user.save();
    res.status(200).json("Address update successful");
  } catch {
    return res.status(500).json("An error occured, try again");
  }
}
