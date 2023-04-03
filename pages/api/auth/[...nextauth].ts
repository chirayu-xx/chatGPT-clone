import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import SpotifyProvider from "next-auth/providers/spotify"
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    GithubProvider({
      clientId:process.env.GITHUB_ID!,
      clientSecret:process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ]
  ,
  pages:{
    signIn : '/login'
  }
}
export default NextAuth(authOptions)