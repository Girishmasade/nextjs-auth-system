"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

export default function verifyEmailPage(){

    const [token, settoken] = useState("")
    const [verified, setVerified] = useState(false)
    const [error, seterror] = useState(false)

    const verifyUserEmail = async() => {

     try {
           await axios.post("/api/users/verifyUser", {token})
           setVerified(true)
     } catch (error:any) {
        seterror(true)
        console.log(error.response.data);
     }

     useEffect(() => {
        seterror(false)
       const urlToken = window.location.search.split("=")[1]
       settoken(urlToken || "")
     }, [])
     
     useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail()
        }
      }, [token])
      

    }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

    <h1 className="text-4xl">Verify Email</h1>
    <h2 className="p-2 bg-orange-500 text-black">{token ? `${token}` : "no token"}</h2>

    {verified && (
        <div>
            <h2 className="text-2xl">Email Verified</h2>
            <Link href="/login">
                Login
            </Link>
        </div>
    )}
    {error && (
        <div>
            <h2 className="text-2xl bg-red-500 text-black">Error</h2>
            
        </div>
    )}
</div>

  )
}
