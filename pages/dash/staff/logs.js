import Head from "next/head";
import { FaNotesMedical, FaTrophy } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import Router from 'next/router'
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Dash({ user }) {
  if (!user?.perm >= 7) Router.push('/dash')
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>

  const [loading, setLoading] = useState(true)

  return (
    <div>
      <Head>
        <title>Shanara | Admin Dashboard</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden">
        <SideBar user={user} />
        <div className="py-32 px-10 lg:px-36 pt-10 flex-col justify-center">
          <h1 className="text-3xl">Welcome <strong className="text-blue uppercase text-blue-500">{user?.userName}</strong></h1>
          <h1 className="text-gray-400">Staff Logging System</h1>
          <div className="py-16 px-0 lg:px-36 flex flex-col lg:flex-row justify-center bsm:w-screen">
            <div className="bg-lighter shadow-2xl p-4 rounded-xl m-2">
              <Log />
              <Log />
              <Log />
            </div>
          </div>
        </div>
      </main >
    </div >
  )
}
function Log(lData) {
  return (
    <div className="bg-lighter-x2 rounded-xl p-6 m-4">
      CockkSucc
    </div>
  )
}