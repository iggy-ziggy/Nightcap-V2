import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { styles } from '../../styles';
import { Tilt } from 'react-tilt';
import { slideIn } from '../../utils/motion';
import { motion } from 'framer-motion';
import Auth from '../../utils/auth';

function SideNav() {
    return (
        <div className='container max-h-full py-5 px-5 w-80 justify-center items-center bg-black-100 rounded-2xl border-2 sm:block hidden'>
            <Tilt className="w-full justify-center items-center">
                <div className='w-64 green-pink-gradient p-[1px] rounded-[180px] shadow-card'>
                    <div className='bg-tertiary rounded-[180px] py-5 px-5 min-h-[250px] flex justify-evenly items-center flex-col'>
                        <img
                            className="w-30 h-30 object-contain rounded-[180px]"
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
                        ></img>
                    </div>
                </div>
            </Tilt>
            <p className={`${styles.heroHeadText} mt-2 text-center sm:block hidden`}>Hello <span className='text-[#915eff]'>{Auth.getProfile().data.username}</span></p>
            <div className='flex-col mt-5'>
                <ul className="list-none">
                    <li className="relative py-2">
                        <Link 
                            to="/home"
                            className='flex h-12 cursor-pointer justify-evenly items-center rounded-[5px] px-6 py-4 transition ease-in-out delay-150 bg-tertiary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                            Newsfeed
                        </Link>
                    </li>
                    <li className="relative py-2">
                        <Link 
                            to="/search"
                            className='flex h-12 cursor-pointer justify-evenly items-center rounded-[5px] px-6 py-4 transition ease-in-out delay-150 bg-tertiary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                            Search
                        </Link>
                    </li>
                    <li className="relative py-2">
                        <Link 
                        to="/badges"
                        className='flex h-12 cursor-pointer justify-evenly items-center rounded-[5px] px-6 py-4 transition ease-in-out delay-150 bg-tertiary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                            Badges
                        </Link>
                    </li>
                    <li className="relative py-2">
                        <Link 
                        to="/business/upload" 
                        className='flex h-12 cursor-pointer justify-evenly items-center rounded-[5px] px-6 py-4 transition ease-in-out delay-150 bg-tertiary hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300'>
                            Upload Bussiness
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default SideNav;