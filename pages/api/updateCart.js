import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";

export default async function AddToCartHandler(req, res) {
  try {
    const { cart } = req.body;
    const session = await getServerSession(req, res, options);
    if (!session) return;
    await connectDatabase();
    const user = await User.findOne({ email: session.user.email });
    user.cart = cart;
    await user.save();
    return res.status(200).json("Success");
  } catch (error) {
    return res.status(500).json("An error occured saving cart");
  }
}
