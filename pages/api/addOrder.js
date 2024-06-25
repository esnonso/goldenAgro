import { connectDatabase } from "@/Mongodb";
import { getServerSession } from "next-auth";
import { options } from "./auth/[...nextauth]";
import Order from "@/Mongodb/Models/Order";
import sgMail from "@sendgrid/mail";
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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
      name,
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

    const msg = {
      to: email,
      from: {
        name: process.env.MAIL_NAME,
        email: process.env.MAIL_ADDRESS,
      },
      templateId: "d-f4a126b2f02942cb8e1bcf4605d5438c",
      dynamicTemplateData: {
        name: name,
        order: transaction,
        products: items,
        address: address,
        date: new Date(),
        total: total,
        shipdate:
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) +
          " to " +
          new Date(Date.now() + 12096e5),
      },
    };

    await sgMail.send(msg);
    return res.status(200).json("Your order has been received");
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}
