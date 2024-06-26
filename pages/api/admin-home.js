import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Order from "@/Mongodb/Models/Order";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    const user = await User.findOne({ email: session.user.email });
    if (user.role !== "Administrator") throw new Error("An error occured");

    const orders = await Order.find({});
    const allUsers = await User.find({});

    return res
      .status(200)
      .json({ orders: orders || [], users: allUsers || [] });
  } catch (error) {
    return res
      .status(500)
      .json(error.message || "An error occured fetching orders");
  }
}
