import type { NextAuthConfig} from "next-auth"
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
          return NextResponse.redirect("/dashboard")
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
            llm_response_language: user.llm_response_language,
            unallowed_urls: user.unallowed_urls
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
          llm_response_language: null,
          unallowed_urls: []
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
            llm_response_language: session.user.llm_response_language,
            unallowed_urls: session.user.unallowed_urls
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
          llm_response_language: token.llm_response_language as string,
          unallowed_urls: token.unallowed_urls as string[]
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
      llm_response_language: string | null;
      unallowed_urls: string[];
    }
  }

