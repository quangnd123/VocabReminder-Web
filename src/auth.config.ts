import type { NextAuthConfig, DefaultSession, User } from "next-auth"
import "next-auth/jwt"
import "next-auth";
import { NextResponse } from "next/server";

export default { 
    providers: [],
    pages: {
      signIn: "/login",
    },
    // basePath: "/api/auth",
    session: { strategy: "jwt" },
    callbacks: {
        authorized({ request, auth }) {
        const url = request.nextUrl
        if (url.pathname.startsWith("/dashboard")){
            return!!auth
        } 
        if (url.pathname === "login" && auth) 
          return NextResponse.redirect("/dashboard/vocabulary")
        return true
        },
    jwt({ token, user, trigger, session }) {
      if (trigger === "signIn"){
        if (user){
          return {
            ...token,
            id: user.id,
            name: user.name,
            email: user.email,
            reading_languages: user.reading_languages,
            learning_languages: user.learning_languages,
            reminding_language: user.reminding_language,
          }
        }
      }
      else if(trigger === "signUp"){
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          reading_languages: [],
          learning_languages: [],
          reminding_language: null,
        }
      }
      else if (trigger === "update"){
        if (session){
          return {
            ...token,
            id: session.user.id,
            name: session.user.name,
            email: session.user.email,
            reading_languages: session.user.reading_languages,
            learning_languages: session.user.learning_languages,
            reminding_language: session.user.reminding_language,
          }
        }
      }
      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user:{
          ...session.user, 
          id: token.id as string,
          name: token.name as string,
          email: token.email as string,
          reading_languages: token.reading_languages as string[],
          learning_languages: token.learning_languages as string[],
          reminding_language: token.reminding_language as string
        }
      }
    },
    
  },
  experimental: { enableWebAuthn: true },
} satisfies NextAuthConfig

declare module "next-auth" {
    interface Session {
      accessToken?: string,
      user: User; // Make sure this reflects the updated AdapterUser type
    }

    interface User{
      id?: string;
      name?: string | null;
      email?: string | null;
      reading_languages: string[];
      learning_languages: string[];
      reminding_language: string | null;
    }
  }

