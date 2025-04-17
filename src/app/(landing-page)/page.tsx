"use client"
import { useSession } from "next-auth/react"

export default function SessionInfo() {
    const { data: session, status } = useSession()
  
    if (status === "loading") return <div>Loading...</div>
  
    if (!session) return <div>Not logged in</div>
  
    return (
      <div>
        <div>Signed in as: {session.user?.email}</div>
        <div>{JSON.stringify(session)}</div>
      </div>
    )
  }