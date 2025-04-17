import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation"
import { AuthError } from "next-auth"

export const handleEmailSignIn = async (email: string)=>{
    try {
        await signIn("nodemailer", {email, redirectTo: "/dashboard/vocabulary"})
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`errors/auth?error=${error.type}`)
        }
        throw error;
    }
}

export const handleGoogleSignIn = async ()=>{
    try {
        await signIn("google", {redirectTo: "/dashboard/vocabulary"})
    } catch (error) {
        if (error instanceof AuthError) {
            return redirect(`errors/auth?error=${error.type}`)
        }
        throw error;
    }
}

export const isAuthenticated = ()=>{
    const {data: session} = useSession();
    return !!!session
}