import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Order from "@/Mongodb/Models/Order";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { category } = req.body;
    const currentPage = req.query.page;
    const perPage = 10;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    const user = await User.findOne({ email: session.user.email });
    if (user.role !== "Administrator") throw new Error("An error occured!");

    let totalItems;
    let orders;
    if (!category || category === "") {
      totalItems = await Order.find({}).countDocuments();
      orders = await Order.find({})
        .sort([["_id", -1]])
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    } else {
      totalItems = await Order.find({ delivered: category }).countDocuments();
      orders = await Order.find({ delivered: category })
        .sort([["_id", -1]])
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    }

    return res
      .status(200)
      .json({ orders: orders || [], total: totalItems || 0 });
  } catch (error) {
    return res
      .status(500)
      .json(error.message || "An error occured fetching orders");
  }
}
