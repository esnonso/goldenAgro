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

    const nextWeek = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    const nextTwoweeks = new Date(Date.now() + 12096e5);

    const msg = {
      to: [email, "admin@goldenagro.ng"],
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
        total: `₦ ${numberWithCommas(total)}`,
        shipdate:
          new Date(nextWeek).toUTCString() +
          " To " +
          new Date(nextTwoweeks).toUTCString(),
      },
    };
    res.status(200).json("Your order has been received");

    return sgMail.send(msg);
  } catch (error) {
    return res.status(500).json("An error occured");
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
