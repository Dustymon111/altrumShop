import { useState, useEffect } from "react"
import './Cart.css'
import Swal from 'sweetalert2'
export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    
        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, password })
        })  
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                Swal.fire({
                    icon: 'success',
                    title: 'Login success',
                    text: 'Welcome to my website',
                })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Login fail',
                    text: 'Username or password is incorrect',
                })
            }
        })
        return (
            <>
            <div className="min-h-screen flex items-center justify-center bg-black">
            <h1 className="text-center text-white bg-black font-bold align-middle text-2xl w-2/12 text-wrap">ALTRUM SHOP</h1>
              <div className="bg-black p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-white">Sign In</h2>
                <form className="">
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-600">
                      Username
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setusername(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                      placeholder="Username"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-600">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      onChange={(e) => setpassword(e.target.value)}
                      className="mt-1 p-2 w-full border rounded-md"
                      placeholder="Password"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="text-black font-bold w-full bg-white text-white p-2 rounded-md hover:bg-gray-600 hover:text-white"
                  >
                    Sign In
                  </button>
                </form>
                <p className="text-white pt-6 text-sm">New to Altrum Shop?</p>
                <a href="/register">
                <button
                    type="button"
                    className="my-4 text-black font-bold w-full bg-white text-white p-2 rounded-md hover:bg-gray-600 hover:text-white"
                    >
                    Register
                  </button>
                  </a>
              </div>
            </div>
            </>
          );
    }

