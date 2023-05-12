import Head from "next/head";
import Link from "next/link";
import Nav from "../../../components/layout/nav";
import { useState } from "react";
import Router from 'next/router'
export function getServerSideProps() {
  return {
    props: {
      ip: "I Like cock",
    },
  }
}
export default function Assets({ user, ip }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>
  const [screen, setScreen] = useState("main");
  const [domain, setDomain] = useState("");
  const [added, setAdded] = useState(false);

  async function addDomain() {
    setScreen("addDomain")
    let d = await fetch("/api/config/domain/add", {
      method: "POST",
      body: JSON.stringify({
        domain
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(r => r.json())
  }
  let item;
  switch (screen) {
    case "main": item = (
      <>
        <img className="w-1/2" src="https://icon-library.com/images/domain-icon/domain-icon-5.jpg" />
        <div className="text-4xl font-bold text-center pt-5">
          <h1>Add Domain</h1>
          <p className="text-xl text-gray-500">Add a custom domain for you to use on our uploader</p>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex justify-center mt-10">
            <Link href="/dash/domains">
              <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 hover:border-blue rounded">
                Cancel
              </button>
            </Link>
            <button onClick={() => setScreen("enter")} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-blue-600 hover:border-blue rounded">
              Next
            </button>
          </div>
        </div>
      </>
    )
      break;
    case 'enter': item = (
      <>
        <img className="w-1/3" src="https://icon-library.com/images/domain-icon/domain-icon-5.jpg" />
        <div className="text-4xl font-bold text-center pt-5">
          <h1>Enter Domain Name</h1>
          <div className="mx-3 mt-5 text-lg">
            <div className={`flex bg-lighter-x2 p-4 space-x-4 rounded-lg mb-3 border-b-4 ${!domain || !/^(?![^-\n]*(?:-(?!\.)[^-\n]*)*-\.)(?:(?!-)[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/gm.test(domain) ? " border-red-600" : "border-green-500"}`}>
              <input onChange={(e) => setDomain(e.target.value)} className="bg-lighter-x2 outline-none" type="text" placeholder="Domain Name" />
            </div>
          </div>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex justify-center mt-10">
            <Link href="/dash/domains">
              <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
                Cancel
              </button>
            </Link>
            <button disabled={!/^(?![^-\n]*(?:-(?!\.)[^-\n]*)*-\.)(?:(?!-)[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/gm.test(domain)} onClick={() => setScreen("check")} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-blue-600 rounded">
              Next
            </button>
          </div>
        </div>
      </>
    )
      break;
    case "check": item = (
      <>
        <img className="w-1/3" src="https://icon-library.com/images/domain-icon/domain-icon-5.jpg" />
        <div className="text-4xl font-bold text-center pt-5">
          <h1>Please Repoint your Domain!</h1>
          <p className="text-xl text-gray-500">Please add a CName record pointing to</p>
          <p className="text-xl text-gray-500 p-3 bg-black border-gray-500 border-2 rounded-lg">dns.shanara.host</p>
          <p className="text-xl text-gray-500">Then click continue</p>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex justify-center mt-10">
            <Link href="/dash/domains">
              <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
                Cancel
              </button>
            </Link>
            <button onClick={() => addDomain()} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-blue-600 rounded">
              Next
            </button>
          </div>
        </div>
      </>
    )
      break;
    case "addDomain": item = (
      <>
        <img className="w-1/3" src="https://icon-library.com/images/domain-icon/domain-icon-5.jpg" />
        <div className="text-4xl font-bold text-center pt-5">
          <h1>Your Domain is being added!</h1>
          <p className="text-xl text-gray-500">PLease wait a few moments for us to do some backend work!</p>
        </div>
        <div className="absolute bottom-3 right-3">
          <div className="flex justify-center mt-10">
            <Link href="/dash/domains">
              <button className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
                Cancel
              </button>
            </Link>
            {added ? (
              <button disabled={!added} onClick={() => setScreen("addDomain")} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-blue-600 rounded">
                Next
              </button>
            ) : null}
          </div>
        </div>
      </>
    )
      break;
  }
  return (
    <div>
      <Head>
        <title>Shanara | Domain Adding</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden px-96 bsm:px-2 pt-12 bsm:w-screen">
        <div className="min-h-full min-w-full rounded-3xl bg-lighter shadow-2xl p-10 lg:p-20 relative flex pb-20  flex-col justify-center items-center">
          {domain && /^(?![^-\n]*(?:-(?!\.)[^-\n]*)*-\.)(?:(?!-)[A-Za-z0-9-]{1,63}\.)+[A-Za-z]{2,63}$/gm.test(domain) ? (
            <div className="absolute -top-3 -left-3 bg-lighter-x3 p-3 rounded-xl">
              <p>Now Configuring: {domain}</p>
            </div>
          ) : null}
          {item}
        </div>
      </main >
    </div >
  )
}