import Head from "next/head";
import Link from "next/link";
import { FaCheck, FaNotesMedical, FaTimes, FaTrophy } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import Router from 'next/router'

export default function Dash({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>
  return (
    <div>
      <Head>
        <title>Shanara | Domain Manager</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden">
        <SideBar user={user} />
        <div className="py-32 px-10 lg:px-36 pt-10 flex-col justify-center">
          <h1 className="text-3xl">Welcome <strong className="text-blue uppercase text-blue-500">{user?.userName}</strong></h1>
          <h1>Your Domains</h1>
          <section className="container py-20 mx-auto space-y-20 ">
            <ul className="space-y-2">
              {!user?.domains?.length ? (
                <div className="text-center font-extrabold text-gray-600">
                  <h1 className="text-3xl">Hmm...</h1>
                  <h1 className="text-2xl">Looks like you have no custom domains... Try clicking the add button below</h1>
                </div>
              ) : null}
              {user?.domains?.map((domain) => (
                <li className="flex w-vw-70 items-center bg-lighter-x2 grid-cols-5 p-5 rounded-xl text-2xl">
                  <div className="w-2/12 font-extrabold">
                    {domain?.id}
                  </div>
                  <div className="w-8/12">
                    {domain?.domain_names[0]}
                  </div>
                  <div className="flex flex-col items-center justify-between col-span-5 mt-4 space-y-4 sm:mt-0 sm:space-y-0 sm:flex-row sm:col-span-3">
                    <a href="#" className={`flex items-center justify-center w-full px-2 py-2 text-white sm:w-auto sm:px-6 sm:text-lg rounded-3xl hover:bg-gray-900 ${user.domain === domain.domain_names[0] ? "bg-green-500" : "bg-red-500"}`}>
                      {user.domain === domain.domain_names[0] ? (
                        <>
                          <FaTimes className="mt-1" />
                          <span className="mt-1">Deactivate</span>
                        </>
                      ) : (
                        <>
                          <FaCheck className="mt-1" />
                          <span className="mt-1">Activate</span>
                        </>
                      )}
                    </a>
                  </div>
                </li>
              ))}
              <li className="flex w-vw-70 items-center bg-lighter-x2 grid-cols-5 p-5 rounded-xl border-2 border-green-400 mt-20">
                <div className="col-span-5 mx-auto text-2xl font-extrabold text-center sm:text-xl josefin sm:text-left sm:col-span-2">
                  Add A Custom Domain
                </div>
                <Link href="/dash/domains/add">
                  <div className="flex flex-col items-center justify-between col-span-5 mt-4 space-y-4 sm:mt-0 sm:space-y-0 sm:flex-row sm:col-span-3">
                    <a href="#" className="flex items-center justify-center w-full px-2 py-2 text-white bg-green-400 sm:w-auto sm:px-6 sm:text-lg rounded-3xl hover:bg-gray-900">
                      <FaCheck className="mt-1" />
                      <span className="mt-1">Add Domain</span>
                    </a>
                  </div>
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </main >
    </div >
  )
}