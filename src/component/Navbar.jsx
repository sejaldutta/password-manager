
const Navbar = () => {
  return (
    <nav>
    <div className='bg-purple-200 flex justify-between pb-0 mb-0
        items-center pt-2 px-6'>
        <div className='logo font-bold text-3xl '>
          <span className="text-purple-600 text-2xl">&lt;</span>
          Password Man<span className="text-purple-500">ager</span>
          <span className="text-purple-600 text-2xl">/ &gt;</span>
          </div>
    
        {/* <ul>
            <li className='flex gap-x-3.5'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href='#'>About</a>
                <a className='hover:font-bold' href='#'>Contact Us</a>
            </li>
        </ul> */}

        <button className="text-white text-2xl p-1 rounded-xl bg-purple-900 flex justify-between items-center cursor-pointer hover:bg-purple-700">
          <img className="h-10 w-10" src="/github.svg" alt="github"/>
          <span className="pr-2">GitHub</span>
        </button>

    </div>
    <p className="bg-purple-200 px-11 pt-0 pb-1">Your own password manager.</p>
</nav>
  )
}

export default Navbar