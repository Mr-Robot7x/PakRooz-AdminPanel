import React from 'react'
import logo from "../../public/webAsserts/logo.png"
import Image from 'next/image'
function Sidebar() {
  return (
   <aside className='bg-white w-[270px] fixed top-0 left-0 h-full py-5 px-3 shadow-xl shadow-black/10'>
        <Image  alt='PakRooz Logo' src={logo} quality={100} loading='eager' width={200} className='object-center mx-auto drop-shadow-md' />
   </aside>
  )
}

export default Sidebar
