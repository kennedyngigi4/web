import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";

export const { handlers, signIn, signOut, auth } = NextAuth({

    providers: [
        GoogleProvider({
            "clientId": "",
            "clientSecret": "",
        }),

        Credentials({
            credentials: {
                email: {},
                password: {}
            },
            async authorize(credentials, req){
                const res = await fetch(`${process.env.NEXT_PUBLIC_APIURL}/account/login/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });

                const user = await res.json();

                if (user.success){
                    return user;
                }
                return null;
                
            }

        })
    ],

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.accessToken = user?.access;
                token.id = user?.id;
                token.name = user?.name ?? undefined;
            }
            return token;
        },
        async session({ session, token }) {
            const t = token as JWT;
            session.accessToken = t?.accessToken as string;
            session.user.id = t?.id as string;
            session.user.name = token?.name ?? undefined;
            return session;
        },
    },

    pages: {
        signIn: "/signin",
    },
})



