import Image from 'next/image'
import Type from './Type'


export default function Home() {
  return (
<>
<div className='bg-black w-full min-h-screen items-center align-middle justify-center flex flex-col text-white'>
  <h1 className='text-6xl mb-28'>SpectroSpect</h1>
  <div className='flex items-center flex-col space-y-10'>

  <label
            htmlFor="UserEmail"
            className="relative block w-72 overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-green-500"
          >
            <input
              type="text"
              placeholder="Name"
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-green-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Name
            </span>
          </label>
          <label
            htmlFor="UserEmail"
            className="relative block w-72 overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-green-500"
          >
            <input
              type="password"
              placeholder="Name"
              className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
            />

            <span className="absolute start-0 top-2 -translate-y-1/2 text-xs text-green-500 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs">
              Password
            </span>
          </label>
       
          </div>

</div>
</>   
  )
}
