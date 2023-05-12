import Head from "next/head";
import { FaNotesMedical, FaTrophy } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import Router from 'next/router'
import Link from "next/link";

export default function Dash({ user }) {
  if (!user?.perm >= 7) Router.push('/dash')
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>

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
          <h1 className="text-gray-400">User permissions... Elevated</h1>

        </div>
      </main >
    </div >
  )
}