"use client"
import React, { useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

function page() {
  const router = useRouter()
  const [user, setUSer] = React.useState({
    username: '',
    email: '',
    password: ''
  })

  const [disable, setDisable] = React.useState(true)
  const [loading, setLoading] = React.useState(false)

  const onSignup = async() =>{
    try { 
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error:any) {
      console.log("signup failed")
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (user.username.length > 0 && user.email.length>0 && user.password.length) {
      setDisable(false)
    } else {
      setDisable(true)
    }
  }, [user])
  

  return (
    <div className="flex bg-green-600 min-h-screen items-center justify-center">
    <div className="bg-white text-black p-10 rounded-lg shadow-md">
      <h1 className="text-xl font-bold">{loading ? "Processing..." : "SIGNUP"}</h1>
      <div className="flex flex-col my-4 py-3 gap-2">
        <label htmlFor='username'>username</label>
        <input
          id='username'
          type="text"
          value={user.username}
          placeholder='username'
          onChange={(e) => setUSer({...user, username: e.target.value})}
          className="border-2 outline-none border-gray-400 rounded-md px-2 py-1"
        />

        <label htmlFor='email'>email</label>
        <input
          id='email'
          type="email"
          value={user.email}
          placeholder='Enter your email'
          onChange={(e) => setUSer({...user, email: e.target.value})}
          className="border-2 outline-none border-gray-400 rounded-md px-2 py-1"
        />

        <label htmlFor='password'>password</label>
        <input
          id='password'
          type="password"
          value={user.password}
          placeholder='Enter your password'
          onChange={(e) => setUSer({...user, password: e.target.value})}
          className="border-2 outline-none border-gray-400 rounded-md px-2 py-1"
        />
      </div>
      <button onClick={onSignup} className={`${disable ? "bg-green-200 cursor-not-allowed" : "bg-green-500"} w-full text-center py-1 rounded-sm hover:rounded-md`}>Signup</button>
      <p className="mt-5">Already have an Account <Link href="/login" className="text-green-500 font-bold hover:text-black">LOGIN</Link></p>

    </div>
  </div>

  )
}

export default page
