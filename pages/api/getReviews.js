import { connectDatabase } from "@/Mongodb";
import Review from "@/Mongodb/Models/review";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const reviews = await Review.find({
      rating: { $gt: 3 },
      comment: { $exists: true, $ne: "" },
    }).populate({
      path: "user",
      select: "name",
      model: User,
    });
    const shuffled = reviews.sort(() => 0.5 - Math.random());
    const selectedReviews = shuffled.slice(0, 9);
    return res.status(200).json(selectedReviews);
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
