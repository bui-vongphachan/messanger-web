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
      profile: async (profile: any) => {
        await upsertProfile({
          email: profile.email,
          name: profile.name,
          picture: profile.picture,
        });

        return { ...profile, id: profile.sub };
      },
    }),
    FacebookCredentialsProvider({
      name: "Facebook",
      clientId: process.env.FACEBOOK_CLIENT_ID || "",
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET || "",
      profile: async (profile: any) => {
        await upsertProfile({
          email: profile.email,
          name: profile.name,
          picture: profile.picture.data.url,
        });

        return profile;
      },
    }),
  ],
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      if (!token) return "";

      const profile = await getProfile(token.email);

      if (!profile) return "";

      const salt = jwt.sign({ ...profile }, secret, { expiresIn: maxAge });

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

const upsertProfile = async (profile: {
  email: any;
  name: any;
  picture: any;
}) => {
  const mongoClient = await clientPromise;

  const existingProfile = await getProfile(profile.email);

  if (existingProfile) return existingProfile;

  const insertResult = await mongoClient
    .db(process.env.DATABASE_NAME)
    .collection(COLLECTIONS_USERS)
    .insertOne({
      email: profile.email,
      name: profile.name,
      image: profile.picture,
    });

  if (!insertResult.acknowledged || !insertResult.insertedId) return null;

  return await getProfile(profile.email);
};

async function getProfile(email: any) {
  const mongoClient = await clientPromise;

  const existingUser = await mongoClient
    .db(process.env.DATABASE_NAME)
    .collection(COLLECTIONS_USERS)
    .findOne({
      email,
    });

  if (existingUser) return existingUser;

  return null;
}
