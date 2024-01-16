import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Swal from 'sweetalert2'

export default function Login() {
    const [username, setusername] = useState("")
    const [password, setpassword] = useState("")
    const navigate = useNavigate()

    const login = () => {
      fetch("http://localhost:3000/auth/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify(
            {
               username :username, 
               password :password
            })
      })  
      .then(res => res.json())
      .then(data => {
          console.log(data);
          if (data.message === "Login Success") {
              navigate('/')
              Swal.fire({
                  icon: 'success',
                  title: 'Successfully Signed In!',
                  text: 'Welcome!',
              })
          } else {
              Swal.fire({
                  icon: 'error',
                  title: 'Unable To Sign In',
                  text: 'Invalid Username or Password',
              })
          }
      })
    }
        return (
            <>
            <div className="min-h-screen flex items-center justify-center bg-black">
            <h1 className="text-center text-white bg-black font-bold align-middle text-2xl w-2/12 text-wrap">ALTRUM SHOP</h1>
              <div className="bg-black p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-semibold mb-6 text-white">Sign In</h2>
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
                    onClick={login}
                    className="text-black font-bold w-full bg-white p-2 rounded-md hover:bg-gray-600 hover:text-white"
                  >
                    Sign In
                  </button>
                <p className="text-white pt-6 text-sm">New to Altrum Shop?</p>
                <a href="/register">
                <button
                    type="button"
                    className="my-4 text-black font-bold w-full bg-white  p-2 rounded-md hover:bg-gray-600 hover:text-white"
                    >
                    Register
                  </button>
                  </a>
              </div>
            </div>
            </>
          );
    }

