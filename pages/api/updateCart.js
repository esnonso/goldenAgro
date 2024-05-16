import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";

export default async function AddToCartHandler(req, res) {
  try {
    await connectDatabase();
    const { cart } = req.body;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not found");
    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("User not found");
    user.cart = cart;
    await user.save();
    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json("An error occured saving cart");
  }
}
