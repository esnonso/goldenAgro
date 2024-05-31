import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Order from "@/Mongodb/Models/Order";

export default async function handler(req, res) {
  try {
    const {
      email,
      status,
      transaction,
      reference,
      items,
      message,
      total,
      address,
    } = req.body;
    const session = await getServerSession(req, res, options);
    if (!session) throw new Error("An error occured");
    await connectDatabase();
    await new Order({
      email,
      status,
      transaction,
      reference,
      total,
      items,
      message,
      address,
    }).save();
    res.status(200).json("Your order has been received");
  } catch (error) {
    console.log(error);
    return res.status(500).json("An error occured");
  }
}
