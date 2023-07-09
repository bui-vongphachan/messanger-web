import { COLLECTIONS_USERS } from "@/constants";
import clientPromise from "@/startups/mongodb";
import { ObjectId } from "mongodb";
import { NextAuthOptions } from "next-auth";
import GoogleCredentialsProvider from "next-auth/providers/google";
import FacebookCredentialsProvider from "next-auth/providers/facebook";
import jwt from "jsonwebtoken";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleCredentialsProvider({
      name: "Google",
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    FacebookCredentialsProvider({
      name: "Facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
    }),
  ],
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      if (!token) return "";

      const mongoClient = await clientPromise;

      let existingUser = await mongoClient
        .db(process.env.DATABASE_NAME)
        .collection(COLLECTIONS_USERS)
        .findOne({
          email: token.email,
        });

      if (!existingUser) {
        const insertResult = await mongoClient
          .db(process.env.DATABASE_NAME)
          .collection(COLLECTIONS_USERS)
          .insertOne({
            email: token.email,
            name: token.name,
            image: token.picture,
          });

        if (!insertResult.acknowledged || !insertResult.insertedId) return "";

        existingUser = await mongoClient
          .db(process.env.DATABASE_NAME)
          .collection(COLLECTIONS_USERS)
          .findOne({ _id: new ObjectId(insertResult.insertedId) });
      }

      const salt = jwt.sign({ ...existingUser }, secret, { expiresIn: maxAge });

      return salt;
    },
    decode: async ({ secret, token }) => {
      const decoded = jwt.verify(token!, secret) as any;

      return {
        ...decoded,
        image: decoded.image || "",
        _id: (decoded as any)._id || "",
      };
    },
  },
  callbacks: {
    async session({ session, token }) {
      (session.user as any)._id = token._id;
      (session.user as any).image = token.image;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
