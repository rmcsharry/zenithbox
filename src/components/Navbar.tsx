"use client"

import Link from 'next/link';
import React, { useEffect } from 'react'
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  function getMenuClasses() { 
    let menuClasses = [];
    if (isOpen) {
      menuClasses = [
        'flex',
        'absolute',
        'top-[32px]',
        'bg-gray-800',
        'w-full',
        'p-4',
        'left-0',
        'gap-6',
        'flex-col',
      ];
    } else {
      menuClasses = ['hidden', 'md:flex'];
    };

    return menuClasses.join(' ');
  };

  return (
    <nav className="bg-gray-800 text-white p4 sm:p-4 md:flex md:justify-between md:items-center">
      <div className="container mx-auto flex justify-between items-center">
        <a href="" className="text-2xl font-bold pl-4">
          ZenithBox IDE
        </a>
        <div className={getMenuClasses()}>
          {/* <Link href="/" className="mx-2 hover:text-gray-300">
            Home
          </Link>
          <Link href="/chat" className="mx-2 hover:text-gray-300">
            Chat
          </Link> */}
        </div>

        <div className="md:hidden flex items-center pr-4">
          <button onClick={() => { setIsOpen(!isOpen) }} className='cursoer:pointer'>
            {isOpen ? <span className="text-xl">x</span> : <GiHamburgerMenu /> }
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar