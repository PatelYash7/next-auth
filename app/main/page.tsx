'use client'

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"

export default function (){
    return <div className="bg-orange-200 h-screen ">
            Hello From Main

            <Button onClick={()=>{signOut({redirect: false, callbackUrl: "/"})}}>
                SignOUT
            </Button>
    </div>
}