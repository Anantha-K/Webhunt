import Image from 'next/image'
import Type from './Type'


export default function Home() {
  return (
<>
<div className='bg-black w-full min-h-screen items-center align-middle justify-center flex flex-col text-white'>
  <h1 className='text-6xl mb-28'>SpectroSpect</h1>
  <div className='flex items-center flex-col space-y-10'>

  <label
            for="UserEmail"
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
            for="UserEmail"
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
          <a href="#_" class="relative inline-flex items-center justify-center p-4 px-5 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-green-300">
<span class="absolute inset-0 w-full h-full bg-gradient-to-br from-green-900 via-green-700 to-green-200"></span>
<span class="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-green-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
<span class="relative text-white">Log in</span>
</a>
          </div>

</div>
</>   
  )
}
