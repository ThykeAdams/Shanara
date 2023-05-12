import { TagEmbeds } from "../../utils/funcs.web";

export default function TwitterEmbed({ user, embed }) {
  return (
    <div className='bg-gray-50 dark:bg-black p-10 flex items-center justify-center'>
      <div className='bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border max-w-xl'>
        <div className='flex justify-between'>
          <div className='flex items-center'>
            <img className='h-11 w-11 rounded-full' src={`https://pheonixapi.com/api/discord/v1/user/${user?.userId}/avatar?size=512&proxy=true`} />
            <div className='ml-1.5 text-sm leading-tight'>
              <span className='text-black dark:text-white font-bold block '>{user?.userName || "Loading..."}</span>
              <span className='text-gray-500 dark:text-gray-400 font-normal block'>@ShanaraIsPog</span>
            </div>
          </div>
          <svg className='text-blue-400 dark:text-white h-6 w-auto inline-block fill-current' viewBox='0 0 24 24'>
            <g>
              <path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
            </g>
          </svg>
        </div>
        <p className='underline text-blue-500 block text-xl leading-snug'>https://shanara.host/i/ajsbd123</p>
        <div className='mt-3'>
          <div className='border border-gray-500 rounded-2xl'>
            <img className='w-full rounded-t-2xl' src='https://cdn.trit.wtf/assets/logos/shanara.png' alt='ShanaraLogo' />
            <div className='p-4'>
              <h1 className='font-medium'>{TagEmbeds(embed?.title)}</h1>
              <p className='text-sm font-medium text-gray-600'>{TagEmbeds(embed?.description)}</p>
              <i className='text-gray-500 text-xs font-semibold'>{TagEmbeds(embed?.author)}</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
