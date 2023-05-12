import Head from 'next/head'
import Nav from '../components/layout/nav'

export function getServerSideProps() {
  return {
    props: {
      packages: require('../package.json').dependencies,
    }
  }
}
export default function Home({ user, packages }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Shanara | Credits</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav user={user} />
      <main>

        <h1 className="text-6xl font-bold text-center">Shanara</h1>
        <div className="container">
          <h1 className='text-gray-600 text-lg font-bold'>Shanara would not be possible without the work of many Open Source packages that we use to build our software out of</h1>
          <div className="bg-black border-2 border-gray-500 rounded-lg text-center">
            {Object.keys(packages)?.map((pkg, i) => (
              <p>
                <a href={`https://www.npmjs.com/package/${pkg}`}>{pkg}</a>
              </p>
            ))}
          </div>
        </div>
      </main>

    </div>
  )
}
