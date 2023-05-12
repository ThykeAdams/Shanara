import Head from "next/head";
import { FaNotesMedical, FaTrophy, FaTimes, FaCloud, FaTrash, FaUnlockAlt, FaUserLock, FaEraser, FaHammer } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import Router from 'next/router'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dash({ user }) {
  if (!user?.perm >= 10) Router.push('/dash')
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)

  useEffect(() => fetchUsers(), [])
  function fetchUsers() {
    setUsers([])
    fetch('/api/admin/users').then(res => res.json()).then(setUsers)
    setSelectedUser(null)
  }
  return (
    <div>
      <Head>
        <title>Shanara | Admin Dashboard</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden">
        <SideBar user={user} />
        <InfoModal user={selectedUser} close={() => setSelectedUser(null)} refresh={() => fetchUsers()} />
        <div className="py-32 px-10 lg:px-36 pt-10 flex-col justify-center">
          <h1 className="text-3xl">Welcome <strong className="text-blue uppercase text-blue-500">{user?.userName}</strong></h1>
          <h1 className="text-gray-400 text-xl">{users?.length} Users</h1>
          {/* {JSON.stringify(users)} */}
          <div className="mt-10 flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-y-10 gap-x-6 w-full object-center bsm:px-2">
              {users?.map((userData, i) => (
                <UserCard user={userData} index={i} click={() => setSelectedUser(userData)} />
              ))}
            </div>
          </div>
        </div>
      </main >
    </div >
  )
}
function UserCard({ user, index, click = () => { } }) {
  return (
    <div onClick={click} key={index} className="container mx-auto shadow-lg rounded-lg max-w-md hover:shadow-2xl transition duration-300 bg-lighter relative">
      <div className="absolute bg-lighter-x2 p-2 w-10 h-10 text-center rounded-lg -top-3 -left-3">
        {index + 1}
      </div>

      <img src={`https://japi.rest/discord/v1/user/${user.userId}/avatar`} alt="Image" className="rounded-t-lg w-full h-56" />
      <div className="p-6 relative">
        <h1 className="text-inherit text-sm transition duration-200 font-bold text-white">{user?.userName}</h1>
      </div>
    </div>
  )
}
function InfoModal({ user, close = () => { }, refresh = () => { } }) {
  if (!user) return null
  function hitUser(route, method) {
    let url = route.replace(/{user}/g, user.userId)
    fetch(url, { method }).then(res => res.json())
  }
  return (
    <div className={`z-40 fixed top-0 backdrop-blur-sm w-screen h-screen overflow-y-hidden flex justify-center items-center`}>
      <div className="bg-lighter w-8/12 h-4/6 rounded-xl shadow-2xl bsm:w-screen relative">
        <div onClick={close} className="absolute right-5 top-4 text-4xl hover:text-gray-300 transition-colors duration-200 font-semibold">
          <FaTimes />
        </div>
        <div className="p-2 flex flex-col lg:flex-row">
          <div class="w-6/12 max-w-md mx-auto bg-lighter-x2 shadow-md rounded-md px-6 py-4 my-6">
            <div class="sm:flex sm:justify-between">
              <div class="flex items-center">
                <img class="h-12 w-12 rounded-full" src={`https://japi.rest/discord/v1/user/${user?.userId}/avatar`} alt="" />
                <div class="ml-2">
                  <h3 class="text-lg text-white font-medium">{user?.userName}</h3>
                  <span class="text-gray-400">Plan: <strong className="uppercase">{user?.plan}</strong></span>
                </div>
              </div>

            </div>
            <div class="flex justify-between items-center mt-4">
              {[
                { name: "Uploads", stats: user?.stats?.uploads || 0 },
                { name: "Notes", stats: user?.stats?.notes || 0 },
                { name: "Gay Furry Porn?", stats: "Loves it" },
              ].map(item => (
                <div>
                  <h4 class="text-white text-sm">{item.name}</h4>
                  <span class="mt-2 text-xl font-medium text-gray-400">{item.stats}</span>
                </div>
              ))}
            </div>
          </div>
          <div class="w-6/12 mx-auto rounded-md px-6 py-4 my-6"></div>
        </div>
        <div className="absolute flex flex-row-reverse bottom-5 right-5">
          <SafeSwitch direction="up" onClick={() => {
            fetch(`/api/admin/user/${user?.userId}`, { method: "DELETE" })
            refresh()
          }} />
          <SafeSwitch direction="up" color="bg-yellow-700" icon={user?.banned || true ? <FaUnlockAlt /> : <FaHammer />} onClick={() => {
            fetch(`/api/admin/user/${user?.userId}/ban`, { method: "POST" })
            refresh()
          }} />
        </div>
      </div>
    </div>
  )
}
function SafeSwitch({ direction = "right", color = "bg-red-500", icon = <FaTrash />, CoverIcon = FaUserLock, onClick = () => { } }) {
  const [unlocked, setUnlocked] = useState(false)
  const [countdown, setCountdown] = useState(null)
  let translation = direction === "right" ? "translate-x-20" : direction === "left" ? "-translate-x-20" : direction === "up" ? "-translate-y-20" : "translate-y-20"
  useEffect(() => {
    if (!unlocked) return setCountdown(null)
    setTimeout(() => setCountdown(countdown - 1), 1000)
  }, [countdown])
  function unlock() {
    setUnlocked(!unlocked)
    if (unlocked) return
    setCountdown(3)
    setTimeout(() => setUnlocked(false), 3000)
  }
  return (
    <div className="relative container flex justify-center items-center bg-lighter-x2 w-20 h-20 rounded-xl shadow-xl mx-2">
      <button onClick={onClick} class={`mb-2 md:mb-0 px-5 py-5 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600 ${`${color} border border-red-500`}`}>{icon}</button>
      <div onClick={unlock} className={`absolute top-0 w-20 h-20 z-10 transition-transform rounded-xl opacity-80 bg-red-600 text-xl flex justify-center items-center duration-1000 ${unlocked ? `${translation} text-2xl font-extrabold` : ''}`}>
        {countdown ? <p>{countdown}</p> : <CoverIcon className="w-10 h-10" />}
      </div>
    </div>
  )
}