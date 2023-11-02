import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import React, { useState, useRef } from 'react';
import { Navbar } from '../components';

import Auth from '../utils/auth';

import { motion } from 'framer-motion';
import { styles } from '../styles';
import { EarthCanvas, StarsCanvas } from '../components/canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

const Form = () => {
  const formRef = useRef();
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  const toggleShowFields = () => {
    setShowFields(!showFields);
  };

  return (
    <div>
      <div className={`${styles.padding} max-w-7xl mx-auto relative z-0 xl:mt-12 xl:flex-row flex-col flex gap-10 overflow-hidden`}>
        <motion.div
          variants={slideIn('left', "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>New to us?</p>
          <h3 className={styles.sectionHeadText}>Start here!</h3>

          <form
            ref={formRef}
            onSubmit={handleFormSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Username</span>
              <input
                placeholder="Your username"
                name="username"
                type="text"
                value={formState.name}
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>

            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Email</span>
              <input
                placeholder="Your email"
                name="email"
                type="email"
                value={formState.email}
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>

            <label className='flex flex-col'>
              <span className='text-white font-medium mb-4'>Password</span>
              <input
                placeholder="******"
                name="password"
                type='password'
                id="password"
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>

            {/* <label className='flex flex-col'>
            <span className='text-white font-medium mb-4'>Confirm Password</span>
            <input
            placeholder="******"
            name="confirmPassword"
            type={showFields? 'text' : 'password'}
            id="confirmPassword"
            onChange={handleChange}
            className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
          />
          </label> */}
            {/* <div className='flex flex-row'>
            <button type="button" 
              className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
              onClick={toggleShowFields}>
              {showFields ? 'Hide' : 'Show Password'}
            </button>
          </div> */}
            <div className='flex flex-row sm:block justify-center'>
              <button
                type="submit"
                className='bg-tertiary py-3 px-8 outline-none w-fit text-secondary font-bold shadow-md shadow-primary rounded-xl hover:text-white'
              >
                Go!
              </button>
            </div>
          </form>
        </motion.div>

        <motion.div
          variants={slideIn('right', "tween", 0.2, 1)}
          className='xl:flex-1 xl:h-auto md:h-[550px] h[350px]'
        >
          <EarthCanvas />
        </motion.div>
      </div>
    </div>
  );
};

const Signup = () => {
  return (
    <div className='relative z-0 bg-primary w-full h-screen mx-auto'>
      <div className='bg-space-pattern bg-cover h-screen bg-no-repeat bg-center'>
        <Navbar />
        <Form />
      </div>
    </div>
  )
}

export default Signup;
