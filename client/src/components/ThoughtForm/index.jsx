import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { slideIn } from '../../utils/motion';
import { motion } from 'framer-motion';
import { Tilt } from 'react-tilt';

import { ADD_THOUGHT } from '../../utils/mutations';
import { QUERY_THOUGHTS } from '../../utils/queries';

import Auth from '../../utils/auth';

const ThoughtForm = () => {
  const [thoughtTitle, setThoughtTitle] = useState('');
  const [thoughtPlace, setThoughtPlace] = useState('');
  const [thoughtText, setThoughtText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);


  const [addThought, { error }] = useMutation
    (ADD_THOUGHT, {
      refetchQueries: [
        QUERY_THOUGHTS,
        'getThoughts'
      ]
    });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addThought({
        variables: {
          thoughtTitle,
          thoughtPlace,
          thoughtText,
          thoughtAuthor: Auth.getProfile().data.username,
        },
      });
      setThoughtTitle('');
      setThoughtPlace('');
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

    if (name === 'thoughtTitle') {
      setThoughtTitle(value);
    }

    if (name === 'thoughtPlace') {
      setThoughtPlace(value);
    }

  };

  return (
    <div className="w-full flex flex-col">
      <motion.div
        variants={slideIn('left', "tween", 0.2, 1)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px]'
      >
        <div className='bg-black-100 rounded-[20px] py-5 px-12 min-h-[300px] flex justify-evenly items-center flex-col'>
          <h3>What are you drinking?</h3>

          {Auth.loggedIn() ? (
            <>
              <form
                className="flex-row justify-center justify-space-between-md align-center"
                onSubmit={handleFormSubmit}
              >
                <label className='flex flex-col'>
                  <textarea 
                      rows="1"
                      type='text' 
                      id='title'
                      name='thoughtTitle'
                      placeholder='Drink Name'
                      value={thoughtTitle}
                      onChange={handleChange}
                      className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                    />
                </label>
                <label className='flex flex-col'>
                  <textarea 
                    rows="2"
                    type='text' 
                    id='business'
                    name='thoughtPlace'
                    placeholder='Place of Business'
                    value={thoughtPlace}
                    onChange={handleChange}
                    className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                  />
                </label>
                <label className='flex flex-col'>
                  <textarea
                    rows="4"
                    name="thoughtText"
                    placeholder="Add a description of the drink ingredients and experience!"
                    value={thoughtText}
                    onChange={handleChange}
                    className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                  />
                  <span className={`text-white font-medium ${characterCount === 280 || error ? 'text-danger' : ''}`}
                  >
                    Character Count: {characterCount}/280</span>
                </label>
                {/* <label className='flex flex-col'>
                  <input type='checkbox' id='allergen1' value='nuts'></input>
                  <label for="allergen1">Nuts</label><br></br>
                  <input type='checkbox' id='allergen2' value='egg'></input>
                  <label for="allergen2">Egg</label><br></br>
                  <input type='checkbox' id='allergen5' value='dairy'></input>
                  <label for="allergen5">Dairy</label><br></br>
                  <input type='checkbox' id='allergen6' value='gluten'></input>
                  <label for="allergen6">Gluten</label><br></br>
                </label> */}

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
