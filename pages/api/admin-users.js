import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const currentPage = req.query.page;
    const perPage = 10;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    const user = await User.findOne({ email: session.user.email });
    if (user.role !== "Administrator") throw new Error("An error occured!");

    const totalItems = await User.find({}).countDocuments();
    const users = await User.find({})
      .sort([["_id", -1]])
      .skip((currentPage - 1) * perPage)
      .limit(perPage);

    return res.status(200).json({ users: users || [], total: totalItems || 0 });
  } catch (error) {
    return res
      .status(500)
      .json(error.message || "An error occured fetching orders");
  }
}
