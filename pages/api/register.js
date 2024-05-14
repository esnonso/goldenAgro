import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { firstname, lastname, email, password, phone } = req.body;
    const foundEmail = await User.findOne({ email: email.toLowerCase() });
    if (foundEmail) {
      const error = new Error("This email is already taken");
      error.status = 409;
      throw error;
    }
    await new User({
      name: `${firstname} ${lastname}`,
      email: email.toLowerCase(),
      password: await bcrypt.hash(password, 10),
      phone: phone,
      status: "Administrator",
    }).save();
    return res.status(200).json("Success! Check you email for confirmation");
  } catch (error) {
    if (error.status) {
      res.status(error.status).json(error.message);
    } else {
      console.log(error);
      res.status(500).json("An error occured");
    }
  }
}
