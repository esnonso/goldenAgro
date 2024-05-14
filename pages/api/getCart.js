import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";

export default async function AddToCartHandler(req, res) {
  try {
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not found");
    await connectDatabase();
    const user = await User.findOne({ email: session.user.email });
    return res.status(200).json(user.cart);
  } catch (error) {
    return res.status(500).json(error);
  }
}
