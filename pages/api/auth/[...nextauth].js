import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"

export const authOptions = {
  
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    
  ],

  adapter: MongoDBAdapter(clientPromise),

  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      return session;
    }
  },  
}

export default NextAuth(authOptions)