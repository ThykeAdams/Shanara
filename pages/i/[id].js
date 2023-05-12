import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

import Head from "next/head";
import NavBar from "../../components/layout/nav";
import { RenderFile, RenderMeta } from "../../components/renderFile";
import { getUploadData, TagEmbeds } from "../../utils/funcs.web";

export async function getServerSideProps(context) {
  let fileData = await getUploadData(context);
  if (!fileData)
    return {
      redirect: {
        permanent: false,
        destination: "/404",
      },
    };
  return {
    props: {
      fileData,
    },
  };
}

export default function FileRender({ user, fileData }) {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className='imp-overflow-hidden' style={{ overflowY: "hidden" }}>
      <RenderMeta fileData={fileData} user={user} />
      <NavBar user={user} />
      <InfoModal showInfo={showInfo} fileData={fileData} close={() => setShowInfo(false)} />
      <main className='flex flex-col justify-center items-center mt-36'>
        {/* {JSON.stringify(meta) + "A"} */}
        <RenderFile url={fileData?.file?.url} />
        <div className='flex justify-center mt-10'>
          <button className='mx-3 bg-lighter hover:bg-lighter-x2 text-white font-bold py-2 px-4 border-b-4 border-green-600 hover:border-blue rounded'>Download</button>
          <button onClick={() => setShowInfo(true)} className='mx-3 bg-lighter hover:bg-lighter-x2 text-white font-bold py-2 px-4 border-b-4 border-blue-600 hover:border-blue rounded'>
            Show More
          </button>
        </div>
      </main>
    </div>
  );
}

function InfoModal({ showInfo, fileData, close = () => { } }) {
  if (!showInfo) return null;
  return (
    <div className='z-40 absolute top-0  backdrop-blur-sm w-screen h-screen flex justify-center items-center'>
      <div className='bg-lighter w-8/12 h-4/6 rounded-xl shadow-2xl'>
        <div className='border-b border-teal-700 pt-3 text-5xl font-bold px-10 pb-3 relative'>
          <h1>{fileData?.uid}</h1>
          <div onClick={close} className='absolute right-5 top-4 hover:text-gray-300 transition-colors duration-200 font-semibold'>
            <FaTimes />
          </div>
        </div>
        <p className='px-4 text-xl'>File Statistics</p>
        <div className='px-10 py-10'>
          <p>Uploaded by:</p>
          <div className='flex group'>
            <img className=' absolute w-12 h-12 rounded-full ' src={`https://japi.rest/discord/v1/user/${fileData?.user.userId}/avatar`} />
            <h1 className='ml-14 text-4xl font-bold inline'>
              {fileData?.user?.userName}
              <p className='text-gray-500 inline'>#1234</p>
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
