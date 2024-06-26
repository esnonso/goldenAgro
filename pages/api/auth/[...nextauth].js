import NextAuth from "next-auth/next";
import { connectDatabase } from "@/Mongodb";
import User from "@/Mongodb/Models/user";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

export const options = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      credentials: {},
      async authorize(credentials, req, res) {
        await connectDatabase();
        try {
          const user = await User.findOne({
            email: credentials.email.toLowerCase(),
          });
          if (!user) {
            throw new Error("Invalid Email or password");
          }
          const comparePwd = await bcrypt.compare(
            credentials.password,
            user.password
          );
          if (!comparePwd) throw new Error("Invalid email or password");
          return user;
        } catch (err) {
          throw new Error(err.message || "An error occured");
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(options);

export default handler;
