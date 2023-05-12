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
        <div className='flex justify-center'>
          <img src='https://cdn.trit.wtf/assets/logos/shanara.png' className='w-1/2 flex justify-center' />
        </div>
        <h1 className="text-6xl font-bold text-center">Shanara</h1>
      </main>
      <Footer />
    </div>
  )
}
