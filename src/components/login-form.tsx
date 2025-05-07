"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { handleEmailSignIn, handleGoogleSignIn } from "../lib/auth"
import { useState } from "react"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const [email, setEmail] = useState<string>("")
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            First time login will automatically sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  onChange={(event)=>setEmail(event.target.value)}
                />
                <Button type="submit" className="w-full" onClick={()=>handleEmailSignIn(email)}>
                    Login
                </Button>
            </div>
            <Button variant="outline" className="w-full" onClick = {()=>handleGoogleSignIn()}>
                Login with Google
            </Button>
        </div>
        </CardContent>
      </Card>
    </div>
  )
}
