"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react";


export default function RegisterPage(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const router = useRouter();
   
    

    //function to handle submit button
    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(password != confirmPassword){
            alert("password do not match");
            return;
        }

        try{
            const res = await fetch("api/auth/register",{
                method: "POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                })
            })
            const data = await res.json();

            if(!res.ok){
                throw new Error(data.error || "Registration Failed");
            }
            //if no error
            console.log(data);
            router.push("/login")
        }
        catch(error){
            console.log(error);
        }
    }

    return(
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">Registration</h1>
          <form onSubmit={handleSubmit} className="space-y-5">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              required
              aria-label="Email"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              required
              aria-label="Password"
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 text-gray-100 placeholder-gray-400 border border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400"
              required
              aria-label="Confirm Password"
            />
            <button
              type="submit"
              className="w-full py-3 bg-amber-400 hover:bg-amber-600 text-white font-semibold rounded-md shadow-sm transition duration-300"
            >
              Register
            </button>
          </form>
        </div>
    );
}