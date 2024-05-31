import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Order from "@/Mongodb/Models/Order";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const currentPage = req.query.page;
    const perPage = 5;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    const totalItems = await Order.find({
      email: session.user.email,
    }).countDocuments();

    const orders = await Order.find({ email: session.user.email })
      .sort([["_id", -1]])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);
    return res
      .status(200)
      .json({ orders: orders || [], total: totalItems || 0 });
  } catch (error) {
    return res
      .status(500)
      .json(error.message || "An error occured fetching orders");
  }
}
