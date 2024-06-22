import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";

export default async function handler(req, res) {
  try {
    await connectDatabase();
    const { email, confirmationCode } = req.body;
    if (!email || !confirmationCode) throw new Error("Could not verify email");
    const foundUser = await User.findOne({ email: email });
    if (foundUser.confirmed === true)
      throw new Error("Your email has been verified, proceed to login");
    if (!foundUser) throw new Error("Could not verify email");
    if (foundUser.confirmationCode !== confirmationCode)
      throw new Error("Could not verify email");

    foundUser.confirmed = true;
    foundUser.confirmationCode = "";
    await foundUser.save();
    return res.status(200).json("Success");
  } catch (error) {
    res.status(500).json(error.message || "An error occured");
  }
}
