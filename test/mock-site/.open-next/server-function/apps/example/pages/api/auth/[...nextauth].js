import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: 'GITHUB_CLIENT_ID',
      clientSecret: 'GITHUB_CLIENT_SECRET',
    }),
  ],
  secret: 'NEXTAUTH_SECRET',
};

export default NextAuth(authOptions);
