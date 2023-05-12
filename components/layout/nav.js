import { FiLogIn, FiLogOut } from "react-icons/fi"
import { useState } from "react"
import { FaCogs, FaUserAlt, FaLogOut, FaToggleOn } from "react-icons/fa"
import Router from "next/router"
import Link from "next/link"
export function NavButton({ onClick = () => { }, text = '', icon = '', html = null }) {
  return (
    <div onClick={onClick} className="rounded-md p-5 py-2 bg-lighter-x2 group hover:shadow-md hover:-translate-y-0.5 flex mx-3">
      {html ? html :
        <>
          <span className="mt-1 pr-2">{icon}</span>
          <span className="group-hover:font-bold">{text}</span>
        </>}
    </div>
  )
}
export function AccountDropDown({ user, options }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div onClick={() => setOpen(!open)} className="rounded-md p-5 py-2 bg-lighter-x2 group hover:shadow-md hover:-translate-y-0.5 flex mx-3 relative">
        <div className="flex">
          <img className="w-7 rounded-full mr-2" src={`https://japi.rest/discord/v1/user/${user.userId}/avatar`} />
          <p className="pt-1 font-bold">{user.userName}</p>
        </div>
      </div>
      {open && (
        <div className="p-3 py-0 absolute top-16 right-5 bg-lighter-x2 rounded-md">
          <Link href="/dash">
            <div className="w-full hover:bg-lighter-x3 flex p-2 rounded-xl my-0.5">
              <FaToggleOn className="mt-1" />
              <p className="px-2">Dashboard</p>
            </div>
          </Link>
          <div className="w-full hover:bg-lighter-x3 flex p-2 rounded-xl my-0.5">
            <FaCogs className="mt-1" />
            <p className="px-2">Settings</p>
          </div>
          <div className="w-full hover:bg-lighter-x3 flex p-2 rounded-xl my-0.5">
            <FaUserAlt className="mt-1" />
            <p className="px-2">Profile</p>
          </div>
          <div className="w-full border-b-2 border-gray-700" />
          <Link href="/api/discord/logout">
            <div className="w-full hover:bg-lighter-x3 flex p-2 rounded-xl my-0.5">
              <FiLogOut className="mt-1" />
              <p className="px-2">Log Out</p>
            </div>
          </Link>
        </div>
      )}
    </>
  )
}
export default function NavBar({ user }) {
  return (
    <nav className="z-50 absolute top-0 w-screen py-3 px-2 bg-lighter shadow-md text-white flex justify-end">
      <div className="absolute left-4 text-xl">
        <h1 >Shanara</h1>
        <p className="text-xs text-zinc-500">By Tritum</p>
      </div>
      {!user || user.error ? (
        <NavButton text="Login" onClick={() => Router.push("/api/discord/login")} icon={<FiLogIn />} />
      ) :
        <AccountDropDown user={user} />
      }
    </nav>
  )
}