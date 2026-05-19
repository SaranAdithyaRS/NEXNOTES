import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/Input/PasswordInput'
import { validateEmail } from '../utils/Helper'
import axiosInstance from '../utils/axiosInstance'

const Login = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter the password.")
      return
    }

    setError(null)

    try {
      const response = await axiosInstance.post("/login", { email, password })

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }

    } catch (err) {
      setError(err.response?.data?.message || "An error occurred during login.")
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-[1.05fr_0.95fr] bg-white/80 border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-200/70 overflow-hidden">
          <section className="hidden lg:flex flex-col justify-between bg-zinc-950 text-white p-10 relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[linear-gradient(90deg,rgba(255,255,255,.2)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.2)_1px,transparent_1px)] bg-[size:32px_32px]" />
            <div className="relative">
              <p className="text-sm text-zinc-300 mb-4">Your focused writing desk</p>
              <h1 className="text-5xl font-semibold leading-tight">
                Keep every idea in one calm place.
              </h1>
            </div>
            <div className="relative grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/10 border border-white/10 p-4">
                <p className="text-3xl font-semibold">01</p>
                <p className="text-sm text-zinc-300 mt-2">Pin what matters first.</p>
              </div>
              <div className="rounded-xl bg-white/10 border border-white/10 p-4">
                <p className="text-3xl font-semibold">#</p>
                <p className="text-sm text-zinc-300 mt-2">Tags keep thoughts tidy.</p>
              </div>
            </div>
          </section>

          <section className="px-6 sm:px-10 py-10 sm:py-14">
            <form onSubmit={handleLogin}>
              <p className="text-sm font-semibold text-zinc-500 mb-2">Welcome back</p>
              <h4 className="text-3xl font-semibold text-zinc-950 mb-2">Login</h4>
              <p className="text-sm text-zinc-500 mb-8">
                Continue to your notes workspace.
              </p>

              <input
                type="email"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-sm text-red-500 mb-4">{error}</p>}

              <button type="submit" className="btn-primary mt-4">
                Login
              </button>

              <p className="text-sm text-center text-zinc-500 mt-6">
                Not registered yet?{" "}
                <Link to="/signup" className="font-semibold text-zinc-950 underline underline-offset-4">
                  Create an account
                </Link>
              </p>

            </form>
          </section>

        </div>
      </main>
    </>
  )
}

export default Login
