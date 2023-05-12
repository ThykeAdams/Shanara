import Link from "next/link";
import { FaBoxes, FaCog, FaCoins, FaExclamation, FaFolder, FaShieldAlt, FaGavel, FaHamburger, FaHome, FaImage, FaMoneyBill, FaNetworkWired, FaPaintBrush, FaSpotify, FaUserAlt } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState(true);
  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize(+window.innerWidth < 768);
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}
export default function Sidebar({ user }) {
  const shouldOpen = useWindowSize();
  const [isOpen, setIsOpen] = useState(shouldOpen);
  useEffect(() => setIsOpen(!shouldOpen), [shouldOpen]);

  return (
    <>
      <div className={`bsm:fixed z-40 bsm:mt-0 flex flex-col top-0 mt-10 bg-lighter h-full transition-all duration-500 rounded-r-xl ${isOpen ? "w-64 bsm:w-screen bsm:h-screen bsm:z-50" : "w-0"}`}>
        <div className='flex items-center h-14 border-b relative'>
          {isOpen ? <div className={`font-bold text-xl text-left  px-3`}>Shanara</div> : null}

          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`bg-lighter-x2  rounded-md transition-all duration-500 px-2 py-1 absolute   ${isOpen ? "right-5" : "-right-10 bsm:top-5 bsm:z-50 shadow-2xl"}`}
          >
            <FaHamburger />
          </div>
        </div>
        <div className='overflow-y-auto overflow-x-hidden flex-grow'>
          <ul className='flex flex-col py-4 space-y-1'>
            <Option type='breaker' text='General' />
            <Option text='Home' icon={<FaHome />} color='indigo' link='/dash' />
            <Option text='Assets' icon={<FaImage />} color='indigo' link='/dash/assets' />
            <Option text='Folders' icon={<FaFolder />} color='indigo' link='/dash/folders' />
            <Option text='Plan' icon={<FaMoneyBill />} color='indigo' link='/dash/billing' />
            <Option text='Settings' icon={<FaCog />} color='indigo' link='/dash/settings' />
            <Option type='breaker' text='Customization' />
            <Option text='Customizer' icon={<FaPaintBrush />} color='indigo' link='/dash/customize' />
            <Option text='Domains' icon={<FaNetworkWired />} color='indigo' link='/dash/domains' />
            {user?.permLevel < 8 ? (
              <>
                <Option type='breaker' text='Legal' />
                <Option text='Terms Of Service' icon={<FaGavel />} color='indigo' link='/legal' />
                <Option text='Privacy' icon={<FaExclamation />} color='indigo' link='/legal' />
                <Option text='Credits' icon={<FaCoins />} color='indigo' link='/credits' />
              </>
            ) : null}
            {user?.permLevel > 7 ? (
              <>
                <Option type='breaker' text='Administration' />
                <Option text='Staff Panel' icon={<FaShieldAlt />} color='indigo' link='/dash/staff' />
                <Option text='Logs' icon={<FaBoxes />} color='indigo' link='/dash/staff/logs' />
                {user?.permLevel > 10 ? (
                  <>
                    <Option text='Users' icon={<FaUserAlt />} color='indigo' link='/dash/staff/users' />
                  </>
                ) : null}
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </>
  );
}
function Option({ type = "option", color, text, icon, link }) {
  let stuff;
  switch (type) {
    case "option":
      {
        stuff = (
          <li>
            <Link href={link}>
              <p className={`relative flex flex-row items-center h-11 focus:outline-none hover:bg-lighter-x2 hover:text-gray-200 border-l-4 border-transparent hover:border-${color}-500 pr-6`}>
                <span className='inline-flex justify-center items-center ml-4'>{icon}</span>
                <span className='ml-2 text-sm tracking-wide truncate'>{text}</span>
              </p>
            </Link>
          </li>
        );
      }
      break;
    case "breaker": {
      stuff = (
        <li className='px-5'>
          <div className='flex flex-row items-center h-8'>
            <div className='pl-5 text-sm tracking-wide text-gray-200 font-bold'>{text}</div>
          </div>
        </li>
      );
    }
  }
  return stuff;
}
