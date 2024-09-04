"use client"
import React, { useState } from 'react';
import {useRouter} from "next/navigation";
import axios from "axios";
import {toast} from "react-hot-toast";

const Navbar = () => {
    const router = useRouter()
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = async () => {
    try {
        await axios.get('/api/users/logout')
        toast.success('Logout successful')
        router.push('/')
    } catch (error:any) {
        console.log(error.message);
        toast.error(error.message)
    }
}
  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto flex justify-around items-center p-4">
        <div className="text-2xl font-bold">
          <a href="#">Nextauth</a>
        </div>

        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-gray-300">Home</a>
          <a href="#" className="hover:text-gray-300">About</a>
          <a href="#" className="hover:text-gray-300">Services</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
        </div>
        <div className="">
        <button className="bg-red-500 text-white px-4 py-2 rounded cursor-pointer" onClick={logout}>Logout</button>
        </div>

        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              />
            </svg>
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Home</a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">About</a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Services</a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-700">Contact</a>
          <div className="">
          <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;