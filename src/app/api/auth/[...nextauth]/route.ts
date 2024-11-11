/* eslint-disable @typescript-eslint/no-explicit-any */
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import dbConnect from "@/lib/DBConnect";
import adminModel from "@/Models/admin.model";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            id: "credentials",
            name: "Credentials",
            credentials: {
                email: { label: 'Email', type: 'text', placeholder: "enter your email" },
                password: { label: 'Password', type: 'password', placeholder: "your password" },
            },
            async authorize(credentials: any): Promise<any> {
                await dbConnect();
                try {
                    const user = await adminModel.findOne({ email: credentials?.email });
                    if (!user) {
                        throw new Error('No admin with this email');
                    }

                    const isPasswordCorrect = await bcrypt.compare(
                        credentials?.password as string,
                        user.password
                    );
                    if (isPasswordCorrect) {
                        return user;
                    } else {
                        throw new Error('Incorrect password');
                    }
                } catch (err) {
                  if (err instanceof Error) {
                      throw new Error(err.message);
                  }
                  throw new Error('An unexpected error occurred');
              }
            },
        }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user) {
          token._id = user._id?.toString(); // Convert ObjectId to string
          
        }
        return token;
      },
      async session({ session, token }) {
        if (token) {
          session.user._id = token._id;
         
        }
        return session;
      },
    },
    session: {
      strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
      signIn: '/sign-in',
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };