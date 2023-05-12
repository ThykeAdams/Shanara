import Head from "next/head";
import Nav from "../../components/layout/nav";
import SideBar from "../../components/layout/sidebar";
import Router from "next/router";

export default function Assets({ user }) {
  if (user?.error || (user?.code && user.code < 1999)) Router.push("/");
  if (!user) return <h1>Loading Data</h1>;
  return (
    <div>
      <Head>
        <title>Shanara | Asset Manager</title>
      </Head>
      <Nav user={user} />
      <main className='flex overflow-hidden'>
        <SideBar user={user} />
        <div className='pt-20 px-10 lg:px-36 flex-col justify-center'>
          <h1 className='text-3xl'>
            Welcome <strong className='text-blue uppercase text-blue-500'>{user?.userName}</strong>
          </h1>
          <div className='mt-5 flex justify-center'>
            <div className='flex flex-wrap justify-around'>
              {user?.latest?.map((item, index) => (
                <div key={index} className='container mx-auto shadow-lg rounded-lg max-w-sm hover:shadow-2xl transition duration-300 relative bg-lighter m-2'>
                  <div className='absolute bg-lighter-x2 p-2 w-10 h-10 text-center rounded-lg -top-3 -left-3 font-extrabold'>{index + 1}</div>
                  <img src={item?.file?.url} alt='' className='rounded-t-lg w-full h-96 object-cover' />
                  <div className='p-6'>
                    <h1 className='md:text-1xl text-xl transition duration-200 font-bold text-white '>{item?.file?.name}</h1>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
