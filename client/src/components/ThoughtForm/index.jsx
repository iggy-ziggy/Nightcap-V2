import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';

import { slideIn } from '../../utils/motion';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';
import { styles } from '../../styles';


import { useParams } from "react-router-dom";

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS, QUERY_BUSINESS } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = ( businessId ) => {
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  const [addThought, { error }] = useMutation(ADD_THOUGHT, {
    refetchQueries: [
      {
        query: QUERY_THOUGHTS,
        variables: {},
      },
      businessId
        ? {
            query: QUERY_BUSINESS,
            variables: { businessId },
          }
        : null,
    ],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const thoughtAuthor = Auth.getProfile().data.username;
  
      const input = {
        thoughtText,
        thoughtAuthor,
        businessId: businessId ? businessId.businessId : null,
      };

      console.log(input);
  
      const { data } = await addThought({

        variables: {
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
          businessId: businessId || null,
        },
      });
      
      setThoughtText('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'thoughtText' && value.length <= 280) {
      setThoughtText(value);
      setCharacterCount(value.length);
    }
  };

  return (
    <div className='mx-auto relative z-0'>
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className='w-full flex-col flex flex-[0.75] green-pink-gradient p-[1px] rounded-[20px]'
      >
        <div className='bg-black-100 rounded-[20px] py-5 px-6 min-h-[300px] flex justify-evenly items-center flex-col'>
          <h3>What are you drinking?</h3>

          {Auth.loggedIn() ? (
            <>
              <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
              >
                <label className='flex flex-col'>
                  <textarea
                    rows="4"
                    name="thoughtText"
                    placeholder="Here's a new thought..."
                    value={thoughtText}
                    onChange={handleChange}
                    className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                  />
                  <span className={`text-white font-medium ${characterCount === 280 || error ? 'text-danger' : ''}`}
                  >
                    Character Count: {characterCount}/280</span>
                </label>

                <div>
                  <button className='bg-tertiary py-3 px-8 outline-none w-fit text-secondary font-bold shadow-md shadow-primary rounded-xl hover:text-white' type="submit">
                    Add Review
                  </button>
                </div>
                {error && (
                  <div className="col-12 my-3 bg-danger text-white p-3">
                    {error.message}
                  </div>
                )}
              </form>
            </>
          ) : (
            <p>
              You need to be logged in to share your thoughts. Please{' '}
              <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
            </p>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ThoughtForm;
