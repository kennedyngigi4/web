import type { DefaultSession, DefaultUser } from "next-auth";


declare module "next-auth" {
    interface Session {
        accessToken?: string;
        user: {
            id?: string;
            name?: string;
            email?: string | null;
            image?: string | null;
        };
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        id?: string;
        name?: string;
    }

    interface User {
        access?: string;
        refresh?: string;
        id?: string;
        name?: string;
    }
}
