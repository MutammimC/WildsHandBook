import { serialize } from 'cookie'
import type { NextApiRequest, NextApiResponse } from 'next'
//import { encrypt } from '@/app/lib/session'
import React, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { createUser } from "../api/monsterApi";

interface User {
    email:string,
    username:string,
    password:string
}

function SignUpForm() {
  const [formData, setFormData] = useState<User>
  ({
      email: "",
      username: "",
      password: ""
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.username || !formData.password) {
      alert("All fields are required!");
      return;
    }
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)) {
      alert("Invalid email format!");
      return;
    }
    if (formData.password.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }
    const formDataToSend = new FormData();

    const response = await createUser(
      {
        email:formData.email,
        username:formData.username,
        password:formData.password
      }
    )
  };
  /*
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("species", formData.species);
    formDataToSend.append("description", formData.description);
    if (formData.image) {
      formDataToSend.append("image", formData.image);
    }

    try {
      console.log(formData);
      const response = await createMonster(formDataToSend); // Ensure API accepts FormData
      setFormData({ name: "", species: "", description: "", image: null });
      setError(""); // Clear any errors
      //navigate("/monsters"); // Redirect after successful creation
    } catch (error) {
      setError("Failed to submit form data while creating monster");
    }
  };
  */
    return (
      <div className="max-w-[500px] bg-[#14161F] overflow-hidden rounded-2xl text-[#010101]">
        <form onSubmit = {handleSubmit} className="relative flex flex-col p-10 gap-0 text-center">
          {/* Form text */}
          <h2 className="font-bold text-2xl text-[white]">Sign Up</h2>
          <p className="text-base text-[white]">Create An Account</p>
          {/* Email Box */}
          <div className="overflow-hidden rounded-lg bg-[] my-4 w-full">
            <input
              type="text"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email:e.target.value})}
              className="bg-[#222630] rounded-lg border-2 outline-none h-10 w-full focus:border-[#596A95] border-[#2B3040] text-white px-4 py-2"
            />
          </div>
          <div className="overflow-hidden rounded-lg bg-[] my-4 w-full">
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({...formData, username:e.target.value})}
              className="bg-[#222630] rounded-lg border-2 outline-none h-10 w-full focus:border-[#596A95] border-[#2B3040] text-white px-4 py-2"
            />
          </div>
          {/* Password Box */}
          <div className="overflow-hidden rounded-lg bg-[] my-4 w-full">
            <input
              type="text"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password:e.target.value})}
              className="bg-[#222630] rounded-lg border-2 outline-none h-10 w-full focus:border-[#596A95] border-[#2B3040] text-white px-4 py-2"
            />
          </div>
          {/* Button */}
          <button className="bg-blue-600 text-white rounded-full px-4 py-2 text-lg font-semibold transition hover:bg-blue-700">
            Submit
          </button>
  
          {/* Form Section !*/}
          <div className="p-4 text-sm bg-[#14161F] shadow-[0_-1px_0_rgba(0,0,0,0.08)]">
            <a href="#" className="font-bold text-blue-600 transition hover:text-blue-700 hover:underline">
              Have an account? Login
            </a>
          </div>
        </form>
      </div>
    );
  }

  export default SignUpForm;