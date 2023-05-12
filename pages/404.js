import Head from 'next/head'
import Footer from '../components/layout/footer'
import Nav from '../components/layout/nav'

export default function Home({ user }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Shanara</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav user={user} />
      <main className='min-h-screen'>
        <div className="flex-1 min-h-full min-w-full rounded-3xl bg-lighter shadow-xl p-10 lg:p-20 text-gray-400 relative md:flex items-center text-center md:text-left">
          <div className="w-full">

            <div className="mb-10 md:mb-20 text-gray-300 font-light">
              <h1 className="font-black uppercase text-3xl lg:text-5xl text-indigo-400 mb-10">404</h1>
              <p>Hmmm....</p>
              <p>It seems that we cant find this page... Either this is an error or You are going to the wrong things</p>
            </div>

          </div>

        </div>
      </main>
      <Footer />
    </div>
  )
}
