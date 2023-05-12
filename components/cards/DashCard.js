import Link from "next/link";

export default function DashCard({ item, index, user }) {
  function OpenContext(e) {
    e.preventDefault();
  }
  return (
    <>
      <Link href={`https://${user?.domain}/i/${item?.uid}`}>
        <div onContextMenu={OpenContext} key={index} className='container shadow-lg rounded-lg sm:w-48 hover:shadow-2xl transition duration-300 bg-lighter relative mx-4 my-4'>
          <div className='absolute bg-lighter-x2 p-2 w-10 h-10 text-center rounded-lg -top-3 -left-3'>{index + 1}</div>
          <img src={item?.file?.url} alt='Image' className='rounded-t-lg w-full h-56 object-cover' />
          <div className='p-6 relative'>
            <h1 className='text-inherit text-sm transition duration-200 font-bold text-white '>{item?.uid}</h1>
          </div>
        </div>
      </Link>
    </>
  );
}
