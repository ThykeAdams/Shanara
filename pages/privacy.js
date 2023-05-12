import Head from 'next/head'
import Footer from '../components/layout/footer'
import Nav from '../components/layout/nav'

export default function Home({ user }) {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Shanara | Privacy Policy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav user={user} />
      <main className='min-h-screen text-left w-full md:w-1/2 lg:w-1/2'>
        <h1 className='text-4xl font-bold'>Our Privacy Policy</h1>
        <h1 className='pt-4'>Shanara (Website: https://wwshanara.host) strives to keep the privacy of our visitors and users, this document (Privacy Policy) contains and shows the type of information that is stored and recorded by Shanara</h1>
        <h1 className='pt-10'>This privacy policy applies to our website and is valid for all users and visitors with regards to the information that may be collected or shared by Shanara. This policy is not applicable to any and all information collected outside of our services</h1>
        <h1 className='text-2xl font-semibold mt-10'>Consent</h1>
        <h1>By using our website, you hereby consent to our Privacy Policy and agree to its terms.</h1>
        <h1 className='text-2xl font-semibold mt-10'>Information we collect</h1>
        <h1>Shanara Collects and stores Diuscord UserData, such as but not limited to:</h1>
        <ul className='pt-10 list-disc w-52'>
          <li className="py-1">User IDs</li>
          <li className="py-1">User Names</li>
          <li className="py-1">User Profile Pictures</li>
        </ul>
        <p>If you contact us via Email, we may recieve additional information about you such as email address or name, Shanara will not store this information</p>
        <h1 className='text-2xl font-semibold mt-10'>How we use this information</h1>
        <h1>We use collected information to identify you on Discord, and allow you to use our dashboard cleanly and effeciently, Shanara will Never share or sell any information collected to a third party, all information collected is stored in a locked database with multiple security measures to prevent database leaks</h1>
        <h1 className='text-2xl font-semibold mt-10'>Log Files</h1>
        <h1>Shanara follows a standard procedure of using log files, Theese files log users when they visit the dashboard. Information logged may include Internet protocol (IP) Addresses, browser type, Date, Internet Service provider (ISP) and possibly the number of clicks. The purpose of this information is for finding bugs and removing them before an issue happens</h1>
        <h1 className='text-2xl font-semibold mt-10'>Advertising Partners Privacy Policies</h1>
        <h1>Third-party ad servers or ad networks uses technologies like cookies, JavaScript, or Web Beacons that are used in their respective advertisements and links that appear on gatebot.xyz, which are sent directly to users' browser. They automatically receive your IP address when this occurs. These technologies are used to measure the effectiveness of their advertising campaigns and/or to personalize the advertising content that you see on websites that you visit.</h1>
        <h1 className='text-2xl font-semibold mt-10'>CCPA Privacy Rights (Do Not Sell My Personal Information)</h1>
        <h1>Under the CCPA, among other rights, California consumers have the right to:</h1>
        <ul className='pt-10 list-disc w-96'>
          <li className="py-1">Request that a business that collects a consumer's personal data disclose the categories and specific pieces of personal data that a business has collected about consumers.</li>
          <li className="py-1">Request that a business delete any personal data about the consumer that a business has collected.</li>
          <li className="py-1">Request that a business that sells a consumer's personal data, not sell the consumer's personal data.</li>
        </ul>
        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>
        <h1 className='text-2xl font-semibold mt-10'>GDPR Data Protection Rights</h1>
        <p>We would like to make sure you are fully aware of all of your data protection rights. Every user is entitled to the following:</p>

        <ul className='pt-10 list-disc'>
          <li className="py-1">The right to access – You have the right to request copies of your personal data. We may charge you a small fee for this service.</li>
          <li className="py-1">The right to rectification – You have the right to request that we correct any information you believe is inaccurate. You also have the right to request that we complete the information you believe is incomplete.</li>
          <li className="py-1">The right to erasure – You have the right to request that we erase your personal data, under certain conditions.</li>
          <li className="py-1">The right to restrict processing – You have the right to request that we restrict the processing of your personal data, under certain conditions.</li>
          <li className="py-1">The right to object to processing – You have the right to object to our processing of your personal data, under certain conditions.</li>
          <li className="py-1">The right to data portability – You have the right to request that we transfer the data that we have collected to another organization, or directly to you, under certain conditions.</li>
        </ul>
        <p>If you make a request, we have one month to respond to you. If you would like to exercise any of these rights, please contact us.</p>

        <h1 className='text-2xl font-semibold mt-10'>Children's Information</h1>
        <p>Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.</p>
        <p>Shanara does not knowingly collect any Personal Identifiable Information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately and we will do our best efforts to promptly remove such information from our records.</p>


      </main>
      <Footer />
    </div>
  )
}
