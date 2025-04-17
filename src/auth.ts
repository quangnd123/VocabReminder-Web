import NextAuth from "next-auth"
import PostgresAdapter from "@auth/pg-adapter"
import { Pool } from "pg"
import type { Adapter } from "next-auth/adapters";
import authConfig from "./auth.config";
import Google from "next-auth/providers/google"
import Nodemailer from "next-auth/providers/nodemailer"
import type { Provider } from "next-auth/providers"

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

const providers: Provider[] = [
  Google,
  Nodemailer({
    server: {
      host: process.env.EMAIL_SERVER_HOST,
      port: process.env.EMAIL_SERVER_PORT,
      auth: {
        user: process.env.EMAIL_SERVER_USER,
        pass: process.env.EMAIL_SERVER_PASSWORD,
      },
    },
    from: process.env.EMAIL_FROM,
  }),
]

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  debug: !!process.env.AUTH_DEBUG,
  adapter: PostgresAdapter(pool) as Adapter,
  providers: providers,
})