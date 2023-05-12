import Head from "next/head";
import { FaNotesMedical, FaTrophy } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import Router from 'next/router'

export default function Dash({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>
  function getConfig() {
    fetch("/api/config/download")
    fetch("/api/config/download")
      .then((res) => { return res.blob(); })
      .then((data) => {
        var a = document.createElement("a");
        a.href = window.URL.createObjectURL(data);
        a.download = "config.sxcu";
        a.click();
      });
  }
  return (
    <div>
      <Head>
        <title>Shanara | Dashboard</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden">
        <SideBar user={user} />
        <div className="py-32 px-10 lg:px-36 pt-10 flex-col justify-center">
          <h1 className="text-3xl">Welcome <strong className="text-blue uppercase text-blue-500">{user?.userName}</strong></h1>
          <div className="flex">

            <div className="bg-lighter p-10 rounded-xl flex flex-col justify-center mx-5">
              <img className="rounded-full" src={`https://japi.rest/discord/v1/user/${user.userId}/avatar`} />
              <h1 className="text-center text-2xl">{user?.userName}</h1>
              <div className="mt-10">

                <button onClick={() => getConfig()} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-yellow-600 rounded">
                  Download Config
                </button>
              </div>
            </div>
            <div className="bg-lighter p-10 rounded-xl flex flex-col justify-center mx-5">

              <div className="mt-10">

                <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
                  Revoke Token
                </button>
              </div>
            </div>


          </div>
        </div>
      </main >
    </div >
  )
}