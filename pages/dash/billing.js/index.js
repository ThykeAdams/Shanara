import Head from "next/head";
import Link from "next/link";
import { FaCheck, FaNotesMedical, FaTrophy } from "react-icons/fa";
import Nav from "../../../components/layout/nav";
import SideBar from "../../../components/layout/sidebar";
import PlanCard from "../../../components/cards/PlanCard";
import Router from 'next/router'

export default function Dash({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push('/')
  if (!user) return <h1>Loading Data</h1>
  // user.domains = [1, 2, 3, 4]
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
          <h1>Your Plan</h1>
          {/* <PlanCard plan="Free" description="Penis IS Good" price="0.00" features={["300mb of storage",]} /> */}
          <div>
            <h1>Plans:</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-x-10 xl-grid-cols-4 gap-y-10 gap-x-6 w-full">
              <PlanCard plan="Free" description="Just trying out the platflorm" price="0.00" features={["300mb of storage",]} />
              <PlanCard plan="Bronze" description="Bit more freedom" price="1.00" features={["Eveything from FREE", "500mb of storage",]} />
              <PlanCard plan="Silver" description="Wow, So nice" price="2.00" features={["Eveything from BRONZE", "750mb of storage", "Access to Notes"]} />
              <PlanCard plan="God" description="HOLY S$%!" price="99.00" features={["Eveything...", "200gb of storage"]} />

            </div>
          </div>
        </div>
      </main >
    </div >
  )
}