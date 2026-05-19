import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import {
  MdArrowForward,
  MdOutlinePushPin,
  MdOutlineSearch,
  MdOutlineStickyNote2,
} from 'react-icons/md'

const Intro = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-[calc(100vh-73px)] px-4 sm:px-6 pt-5 pb-10">
        <section className="max-w-7xl mx-auto grid lg:grid-cols-[1.02fr_0.98fr] gap-8 items-center">
          <div className="pt-5 pb-8 sm:pt-7 sm:pb-14">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-medium text-zinc-600 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-zinc-950" />
              Minimal notes for focused work
            </div>

            <h1 className="mt-7 text-5xl sm:text-6xl lg:text-7xl font-semibold text-zinc-950 leading-[1.02]">
              Write it down.
              <br />
              Find it fast.
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg leading-8 text-zinc-600">
              ELIXR Notes gives your ideas, reminders and drafts a calm workspace
              with pinned notes, tags and quick search.
            </p>

            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                to="/login"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 py-3 text-sm font-semibold text-white shadow-xl shadow-zinc-300/70 hover:bg-zinc-800 transition"
              >
                Login
                <MdArrowForward className="text-xl" />
              </Link>
              <Link
                to="/signup"
                className="inline-flex items-center justify-center rounded-xl border border-zinc-300 bg-white px-6 py-3 text-sm font-semibold text-zinc-950 hover:border-zinc-500 transition"
              >
                Create account
              </Link>
            </div>

            <div className="mt-10 grid sm:grid-cols-3 gap-3 max-w-2xl">
              <div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm">
                <MdOutlineStickyNote2 className="text-2xl text-zinc-900" />
                <p className="mt-3 text-sm font-semibold text-zinc-950">Capture notes</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">Keep thoughts clean and readable.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm">
                <MdOutlinePushPin className="text-2xl text-zinc-900" />
                <p className="mt-3 text-sm font-semibold text-zinc-950">Pin priorities</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">Hold important ideas at the top.</p>
              </div>
              <div className="rounded-xl border border-zinc-200 bg-white/85 p-4 shadow-sm">
                <MdOutlineSearch className="text-2xl text-zinc-900" />
                <p className="mt-3 text-sm font-semibold text-zinc-950">Search quickly</p>
                <p className="mt-1 text-xs leading-5 text-zinc-500">Bring back notes by keyword.</p>
              </div>
            </div>
          </div>

          <div className="relative min-h-[520px]">
            <div className="absolute inset-0 rounded-3xl bg-zinc-950 shadow-2xl shadow-zinc-300" />
            <div className="absolute inset-4 rounded-2xl border border-white/10 bg-[linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:34px_34px]" />

            <div className="absolute left-8 right-8 top-8 rounded-2xl bg-white p-5 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400">PINNED</p>
                  <h2 className="mt-2 text-xl font-semibold text-zinc-950">Project launch notes</h2>
                </div>
                <div className="w-10 h-10 rounded-lg bg-zinc-100 flex items-center justify-center">
                  <MdOutlinePushPin className="text-2xl text-zinc-950" />
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Finalize checklist, review open tasks and collect all launch references.
              </p>
              <div className="mt-5 flex gap-2">
                <span className="rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs text-zinc-600">#work</span>
                <span className="rounded-full bg-zinc-100 border border-zinc-200 px-3 py-1 text-xs text-zinc-600">#today</span>
              </div>
            </div>

            <div className="absolute left-14 right-16 top-64 rounded-2xl bg-zinc-100 border border-zinc-200 p-5 shadow-xl">
              <p className="text-xs font-semibold tracking-[0.18em] text-zinc-400">DRAFT</p>
              <div className="mt-4 space-y-3">
                <div className="h-3 w-5/6 rounded-full bg-zinc-300" />
                <div className="h-3 w-4/6 rounded-full bg-zinc-300" />
                <div className="h-3 w-3/5 rounded-full bg-zinc-200" />
              </div>
            </div>

            <div className="absolute left-24 right-8 bottom-10 rounded-2xl bg-white/95 border border-zinc-200 p-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-zinc-950 flex items-center justify-center">
                  <MdOutlineSearch className="text-2xl text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-950">Fast retrieval</p>
                  <p className="text-xs text-zinc-500 mt-1">Search your saved notes instantly.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

export default Intro
