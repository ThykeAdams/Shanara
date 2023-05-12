import Head from "next/head";
import Nav from "../../components/layout/nav";
import SideBar from "../../components/layout/sidebar";
import DiscordEmbedPreview from "../../components/previews/DiscordEmbed";
import { useEffect, useState } from "react";
import { FaDiscord, FaPaintBrush, FaSlack, FaSpeakerDeck, FaTeethOpen, FaTwitter, FaUserAlt } from "react-icons/fa";
import TwitterEmbed from "../../components/previews/TwitterEmbed";
import Router from 'next/router'

export default function Assets({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>
  const [OGEmbed, setOGEmbed] = useState(user?.embed || {});
  const [embed, setEmbed] = useState(user?.embed || {});
  const [enabled, setEnabled] = useState(user?.embed?.enabled || {});
  const [previewType, setPreviewType] = useState("discord");
  const [unSaved, setUnSaved] = useState(false);
  useEffect(() => {
    setEmbed(user?.embed || {})
    setOGEmbed(user?.embed || {})
  }, [user]);
  function runSetEmbed(data) {
    setUnSaved(true);
    setEmbed((e) => {
      e = {
        ...e,
        ...data,
      }
      return e
    })
  }
  async function saveData() {
    await fetch("/api/config/embed", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(embed)
    })
    setUnSaved(false)
  }
  return (
    <div>
      <Head>
        <title>Shanara | Embed Customizer</title>
      </Head>
      <Nav user={user} />
      <main className="flex overflow-hidden">
        <SideBar user={user} />
        {unSaved ? (
          <div className="absolute bottom-5 z-50 right-10 flex justify-end bg-lighter w-96 py-2 rounded-2xl">
            <button onClick={() => { setEmbed(OGEmbed); setUnSaved(false) }} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-red-600 rounded">
              Revert
            </button>
            <button onClick={() => saveData()} className="mx-3 bg-lighter-x2 hover:bg-lighter-x3 text-white font-bold py-2 px-4 border-b-4 border-green-600 rounded">
              Save
            </button>
          </div>
        ) : null}
        <div className="py-16 px-0 lg:px-36 flex flex-col lg:flex-row justify-center bsm:w-screen">
          <div className="bg-lighter shadow-2xl p-4 rounded-xl m-2">
            <div class="flex flex-col">
              <label for="unchecked" class="mt-3 inline-flex items-center cursor-pointer">
                <span class="relative">
                  <span class="block w-10 h-6 bg-gray-400 rounded-full shadow-inner relative"></span>
                  <span class={`absolute block w-4 h-4 mt-1 ml-1 ${embed?.enabled ? "bg-purple-600 translate-x-4" : "bg-white"} rounded-full shadow inset-y-0 left-0 focus-within:shadow-outline transition-transform duration-300 ease-in-out`}>
                    <input checked={embed?.enabled} onClick={() => runSetEmbed({ enabled: !embed?.enabled })} id="unchecked" type="checkbox" class="absolute opacity-0 w-0 h-0" />
                  </span>
                </span>
                <span class="ml-3 text-sm">Enable Embed</span>
              </label>
            </div>
            <div className="bg-lighter-x2 rounded-xl p-6 m-4">
              <div className="flex bsm:flex-col">
                <div className="mx-3">
                  Provider
                  <div className="flex bg-lighter p-4 space-x-4 rounded-lg mb-3">
                    <FaTeethOpen className="h-6 w-6" />
                    <input value={embed?.provider} onChange={(e) => runSetEmbed({ provider: e.target.value })} className="bg-lighter outline-none" type="text" placeholder="Provider" />
                  </div>
                </div>
                <div className="mx-3">
                  Author
                  <div className="flex bg-lighter p-4 space-x-4 rounded-lg mb-3">
                    <FaTeethOpen className="h-6 w-6" />
                    <input value={embed?.author} onChange={(e) => runSetEmbed({ author: e.target.value })} className="bg-lighter outline-none" type="text" placeholder="Author" />
                  </div>
                </div>
              </div>
              <div className="flex bsm:flex-col">
                <div className="mx-3">
                  Title
                  <div className="flex bg-lighter p-4 space-x-4 rounded-lg mb-3">
                    <FaTeethOpen className="h-6 w-6" />
                    <input value={embed?.title} onChange={(e) => runSetEmbed({ title: e.target.value })} className="bg-lighter outline-none" type="text" placeholder="Title" />
                  </div>
                </div>
                <div className="mx-3">
                  Color
                  <div className="flex bg-lighter p-4 space-x-4 rounded-lg mb-3">
                    <FaPaintBrush className="h-6 w-6" />
                    <input onChange={(e) => runSetEmbed({ color: e.target.value })} value={embed?.color} className="bg-lighter outline-none" type="color" placeholder="Title" />
                    <p>{embed?.color}</p>
                  </div>
                </div>
              </div>
              <div className="mx-3">
                Description
                <div className="flex bg-lighter p-4 space-x-4 rounded-lg mb-3 w-full">
                  <FaSpeakerDeck className="h-6 w-6" />
                  <textarea onChange={(e) => runSetEmbed({ description: e.target.value })} rows={200} value={embed?.description} className="bg-lighter-x2 h-52 w-full outline-none" />
                </div>
              </div>

            </div>
          </div>
          <Preview embed={embed} user={user} />
        </div>
      </main >
    </div >
  )
}
function Preview({ embed, user }) {
  const [type, setType] = useState("discord");
  let item
  switch (type) {
    case "discord": item = <DiscordEmbedPreview embed={embed} user={user} />; break;
    case "twitter": item = <TwitterEmbed embed={embed} user={user} />; break;
    default: item = <div className="text-center items-center text-4xl font-bold">
      No Preview
      <p className="text-gray-500 text-xl">Try Again later</p>
    </div>; break;
  }
  return (
    <div className="bg-lighter shadow-2xl p-4 rounded-xl mx-4 my-2 whitespace-pre-wrap">
      <div className="my-3">

        <button onClick={() => setType("discord")} className={`inline-flex items-center transition-colors duration-100 ease-in focus:outline-none rounded-l-full px-4 py-2 active ${type === "discord" ? "bg-lighter-x3" : "bg-lighter-x2"}`} id="grid">
          <FaDiscord className="h-6 w-6 mr-4" />
          <span>Discord</span>
        </button>
        <button onClick={() => setType("twitter")} className={`inline-flex items-center transition-colors duration-100 ease-in focus:outline-none px-4 py-2 active ${type === "twitter" ? "bg-lighter-x3" : "bg-lighter-x2"}`} id="grid">
          <FaTwitter className="h-6 w-6 mr-4" />
          <span>Twitter</span>
        </button>
        <button onClick={() => setType("slack")} className={`inline-flex items-center transition-colors duration-100 ease-in focus:outline-none rounded-r-full px-4 py-2 active ${type === "slack" ? "bg-lighter-x3" : "bg-lighter-x2"}`} id="grid">
          <FaSlack className="h-6 w-6 mr-4" />
          <span>Slack</span>
        </button>
      </div>

      {item}
    </div>
  )
}