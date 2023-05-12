import Head from "next/head";
import { FaCloud, FaNotesMedical, FaTrophy } from "react-icons/fa";
import Nav from "../../components/layout/nav";
import SideBar from "../../components/layout/sidebar";
import Router from "next/router";
import Link from "next/link";
import DashCard from "../../components/cards/DashCard";

export default function Dash({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push("/");
  if (!user) return <h1>Loading Data</h1>;

  return (
    <div>
      <Head>
        <title>Shanara | Dashboard</title>
      </Head>
      <Nav user={user} />
      <main className='flex overflow-hidden w-screen'>
        <SideBar user={user} />
        <div className='w-full px-10 lg:px-36 pt-10 flex-col justify-center'>
          <h1 className='text-3xl'>
            Welcome <strong className='text-blue uppercase text-blue-500'>{user?.userName}</strong>
          </h1>
          <div className='w-full flex flex-wrap justify-start'>
            {/* Stat Cards */}
            {[
              { name: "Plan", stat: user?.plan, icon: FaTrophy },
              { name: "Uploads", stat: user?.stats?.uploads, icon: FaCloud },
              { name: "Notes", stat: 0, icon: FaNotesMedical },
            ].map((item, index) => (
              <div className='flex flex-row m-auto p-6 gap-8 rounded-lg bg-lighter shadow-2xl mt-10'>
                <div className='my-auto'>
                  <div className='text-lg text-purple-300'>{item.name}</div>
                  <div className='text-4xl text-purple-100 font-bold uppercase'>{item.stat}</div>
                </div>
                <div className='text-purple-300 my-auto bg-lighter-x2 rounded-full p-4'>
                  <item.icon className='h-12 w-12' />
                </div>
              </div>
            ))}
          </div>
          <div className='flex flex-wrap items-center justify-around mt-10 w-full'>
            {user?.latest?.map((item, index) => (
              <DashCard key={index} item={item} index={index} user={user} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
