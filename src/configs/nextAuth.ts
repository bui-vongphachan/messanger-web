import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/google";

export const nextAuthOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      /*    profile: async (_profile: any, token: any) => {
        const profile = _profile as GoogleProfile;

        const mongoClient = await clientPromise;

        const existingUser = await mongoClient
          .db(process.env.DATABASE_NAME)
          .collection(COLLECTIONS_USERS)
          .findOne({
            email: profile.email,
          });

        if (existingUser) return _profile;

        await mongoClient
          .db(process.env.DATABASE_NAME)
          .collection(COLLECTIONS_USERS)
          .insertOne({
            email: profile.email,
            name: profile.name,
            image: profile.picture,
          });

        return _profile;
      }, */
    }),
  ],
};
