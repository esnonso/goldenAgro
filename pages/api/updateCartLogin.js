import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";

export default async function AddToCartHandler(req, res) {
  try {
    await connectDatabase();
    const { cart } = req.body;
    console.log(cart);
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("User not found");
    const user = await User.findOne({ email: session.user.email });
    if (!user) throw new Error("User not found");
    if (cart) {
      for (let item of cart) {
        const existingItem = user.cart.find((i) => i.id === item.id);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else user.cart.push(item);
      }
    }
    const allCart = await user.save();
    return res.status(200).json({ cart: allCart.cart });
  } catch (error) {
    return res.status(500).json("An error occured saving cart");
  }
}
