import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Link, useNavigate } from 'react-router-dom'
import PasswordInput from '../components/Input/PasswordInput'
import { validateEmail } from '../utils/Helper'
import axiosInstance from '../utils/axiosInstance'

const SignUp = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSignUp = async (e) => {
    e.preventDefault()

    if (!name) {
      setError("Please enter your name")
      return
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.")
      return
    }

    if (!password) {
      setError("Please enter the password")
      return
    }

    setError(null)

    try {
      const response = await axiosInstance.post("/signup", {
        name,
        email,
        password
      })

      if (response.data && response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken)
        navigate("/dashboard")
      }

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
    }
  }

  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-5xl grid lg:grid-cols-[0.95fr_1.05fr] bg-white/80 border border-zinc-200 rounded-2xl shadow-2xl shadow-zinc-200/70 overflow-hidden">
          <section className="hidden lg:flex flex-col justify-between bg-zinc-100 p-10 relative overflow-hidden">
            <div className="absolute -right-12 -top-12 w-60 h-60 rounded-full border border-zinc-300" />
            <div className="absolute right-12 bottom-12 w-40 h-40 rounded-full border border-zinc-300" />
            <div className="relative">
              <p className="text-sm font-semibold text-zinc-500 mb-4">Build your library</p>
              <h1 className="text-5xl font-semibold text-zinc-950 leading-tight">
                A cleaner home for lists, drafts and plans.
              </h1>
            </div>
            <div className="relative rounded-2xl bg-white border border-zinc-200 p-5 shadow-xl shadow-zinc-200">
              <p className="text-xs font-semibold text-zinc-400 mb-3">TODAY</p>
              <div className="space-y-3">
                <div className="h-3 w-4/5 bg-zinc-300 rounded-full" />
                <div className="h-3 w-2/3 bg-zinc-200 rounded-full" />
                <div className="h-3 w-5/6 bg-zinc-200 rounded-full" />
              </div>
            </div>
          </section>

          <section className="px-6 sm:px-10 py-10 sm:py-14">
            <form onSubmit={handleSignUp}>
              <p className="text-sm font-semibold text-zinc-500 mb-2">Start writing</p>
              <h4 className="text-3xl font-semibold text-zinc-950 mb-2">Create account</h4>
              <p className="text-sm text-zinc-500 mb-8">
                Set up your notes workspace in a minute.
              </p>

              <input
                type="text"
                placeholder="Name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <input
                type="text"
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
                Create account
              </button>

              <p className="text-sm text-center text-zinc-500 mt-6">
                Already have an account?{" "}
                <Link to="/login" className="font-semibold text-zinc-950 underline underline-offset-4">
                  Login
                </Link>
              </p>

            </form>
          </section>

        </div>
      </main>
    </>
  )
}

export default SignUp
