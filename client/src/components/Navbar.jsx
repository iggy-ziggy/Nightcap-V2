import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../styles';
import { navLinks } from '../constants';
import { logo, menu, close } from '../assets';
import Auth from '../utils/auth';

const Navbar = () => {
  // toggle for navigation
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <nav
          className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
        >
          <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
            <Link
              to="/home"
              className='flex items-center gap-2'
              onClick={() => {
                setActive("");
                // keeps track of where you are on the page
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt="logo" className='w-9 h-9 object-contain sm:block hidden' />
              <p className='text-white text-[18px] font-bold cursor-pointer'>Nightcap<span className='sm:block hidden'></span></p>
            </Link>

            <ul className='list-none hidden sm:flex flex-row gap-10'>
              <li
                className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
                <Link to="/profile">
                  Profile
                  {/* <UserProfilePicture user={currentUser} /> */}
                </Link>
              </li>
              <li
                className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
                <Link to="/" onClick={() => Auth.logout()}>
                  Logout
                </Link>
              </li>
            </ul>

            <div className='sm:hidden flex flex-1 justify-end items-center'>
              <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28] object-contain cursor-pointer'
                onClick={() => setToggle(!toggle)} />
              <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                  <li
                    className='text-secondary hover:text-white text-[16px] font-medium cursor-pointer'>
                    <Link to="/profile">
                      Profile
                    </Link>
                  </li>
                  <li
                    className='text-secondary hover:text-white text-[16px] font-medium cursor-pointer'>
                    <Link to="/">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )
    } else {
      return (
        <nav
          className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary`}
        >
          <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
            <Link
              to="/"
              className='flex items-center gap-2'
              onClick={() => {
                setActive("");
                // keeps track of where you are on the page
                window.scrollTo(0, 0);
              }}
            >
              <img src={logo} alt="logo" className='w-9 h-9 object-contain sm:block hidden' />
              <p className='text-white text-[18px] font-bold cursor-pointer'>Nightcap<span className='sm:block hidden'></span></p>
            </Link>

            <ul className='list-none hidden sm:flex flex-row gap-10'>
              <li
                className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
                <a href='#about'>
                  About
                </a>
              </li>
              <li
                className='text-secondary hover:text-white text-[18px] font-medium cursor-pointer'>
                <Link to="/login">
                  Login
                </Link>
              </li>
            </ul>

            <div className='sm:hidden flex flex-1 justify-end items-center'>
              <img src={toggle ? close : menu} alt="menu" className='w-[28px] h-[28] object-contain cursor-pointer'
                onClick={() => setToggle(!toggle)} />
              <div className={`${!toggle ? 'hidden' : 'flex'} p-6 black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] z-10 rounded-xl`}>
                <ul className='list-none flex justify-end items-start flex-col gap-4'>
                  <li
                    className='text-secondary hover:text-white text-[16px] font-medium cursor-pointer'>
                    <a href='#about'>
                      About
                    </a>
                  </li>
                  <li
                    className='text-secondary hover:text-white text-[16px] font-medium cursor-pointer'>
                    <Link to="/login">
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      )
    }
  }

  return (
    showNavigation()
  )

};

export default Navbar