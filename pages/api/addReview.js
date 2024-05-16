import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Review from "@/Mongodb/Models/review";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { rating, comment } = req.body;
    const session = await getServerSession(req, res, options);
    if (!session) {
      const error = new Error("You need to login to continue");
      error.status = 404;
      throw error;
    }
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      const error = new Error("You need to login to continue");
      error.status = 404;
      throw error;
    }

    await new Review({
      user: user._id,
      rating: rating,
      comment: comment,
    }).save();
    return res.status(200).json("Thank you for rating us!");
  } catch (error) {
    return res
      .status(error.status || 500)
      .json(error.message || "An error occured");
  }
}
