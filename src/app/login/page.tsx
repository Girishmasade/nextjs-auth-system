"use client"
import React, { useEffect} from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import { toast } from 'react-hot-toast'

export default function loginPage() {
const router = useRouter()
  const [user, setUSer] = React.useState({
    email: '',
    password: ''
  })

  const [disable, setDisable] = React.useState(true)
  const [loading, setLoading] = React.useState(false)


  const onLogin = async() =>{
    try { 
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login success", response.data);
      toast.success("Login Success")
      router.push("/");
    } catch (error:any) {
      console.log("signup failed")
      toast.error(error.message)
    }
  }


  useEffect(() => {
    if (user.email.length>0 && user.password.length>0) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [user])
  

  return (
    <div className="flex bg-green-600 min-h-screen items-center justify-center">
    <div className="bg-white text-black p-10 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{loading ? "Processing..." : "LOGIN"}</h1>
      <div className="flex flex-col my-4 py-3 gap-2">
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type="email"
          value={user.email}
          onChange={(e) => setUSer({...user, email: e.target.value})}
          className="border-2 outline-none border-gray-400 rounded-md px-2 py-1"
        />

        <label htmlFor='password'>password</label>
        <input
          id='password'
          type="password"
          value={user.password}
          onChange={(e) => setUSer({...user, password: e.target.value})}
          className="border-2 outline-none border-gray-400 rounded-md px-2 py-1"
        />
      </div>
      <button onClick={onLogin} className={` ${disable ? "bg-green-200 cursor-not-allowed" : "bg-green-500"} w-full text-center py-1 rounded-sm hover:rounded-md`}>Login</button>
      <p className="mt-5">create new account<Link href="/signup" className="text-green-500 font-bold hover:text-black px-3">SIGNUP</Link></p>

    </div>
  </div>

  )
}
