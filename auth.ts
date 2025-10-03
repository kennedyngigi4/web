import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { jwtDecode } from "jwt-decode";


interface DecodedToken {
    exp: number;
}


function getExpiry(accessToken: string) {
    const decoded = jwtDecode<DecodedToken>(accessToken);
    return decoded.exp * 1000;
}


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
                const res = await fetch(`${process.env.APIURL}/account/login/`, {
                    method: "POST",
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" },
                });

                const user = await res.json();

                if (user.success){
                    return user;
                }
                return null;
                
            },
        }),
    ],

    session: {
        strategy: "jwt",
        maxAge: 365 * 24 * 60 * 60,
        updateAge: 30 * 24 * 60 * 60,
    },

    jwt: {
        maxAge: 365 * 24 * 60 * 60,
    },

    callbacks: {
        async jwt({ token, user, account }) {
            if (account && user) {
                token.accessToken = user?.access;
                token.refreshToken = user?.refresh;
                token.id = user?.id;
                token.name = user?.name ?? undefined;
                token.expiresAt = getExpiry(user?.access);
                return token;
            }


            if(Date.now() + 60 * 1000 < (token.expiresAt as number)){
                return token;
            }

            // Token refresh
            try{
                const res = await fetch(`${process.env.APIURL}/account/refresh/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ refresh: token.refreshToken }),
                });

                if (!res.ok) throw new Error("Refresh failed");

                const refreshed = await res.json();

                token.accessToken = refreshed.access;
                token.refreshToken = refreshed.refresh ?? token.refreshToken;
                token.expiresAt = getExpiry(refreshed.access);
                return token;
            } catch(e) {
                
                return { ...token, error: "RefreshAccessTokenError" };
            }
        },
        async session({ session, token }) {
            const t = token as JWT;
            session.accessToken = t?.accessToken as string;
            session.refreshToken = t?.refreshToken as string;
            session.user.id = t?.id as string;
            session.user.name = token?.name ?? undefined;
            return session;
        },
    },

    pages: {
        signIn: "/signin",
    },

    trustHost: true,
})



