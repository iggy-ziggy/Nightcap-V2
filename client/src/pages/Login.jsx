import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '../components';
import { motion } from 'framer-motion';
import { styles } from '../styles';
import { EarthCanvas, StarsCanvas } from '../components/canvas';
import { SectionWrapper } from '../hoc';
import { slideIn } from '../utils/motion';

import Auth from '../utils/auth';

const LoginForm = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);
  const navigateTo = useNavigate();

  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      if (data.login.token) {
        console.log(data);
        navigateTo('/profile');
      }
    } catch (e) {
      console.error(e);
    }

    // clear form values
    // setFormState({
    //   email: '',
    //   password: '',
    // });
  };

  return (
    <div className={`${styles.padding} max-w-7xl mx-auto relative z-0`}>
      <div className='xl:mt-12 xl:flex-row flex-col flex gap-10 overflow-hidden'>
        <motion.div
          variants={slideIn('left', "tween", 0.2, 1)}
          className='flex-[0.75] bg-black-100 p-8 rounded-2xl'
        >
          <p className={styles.sectionSubText}>Welcome</p>
          <h3 className={styles.sectionHeadText}>Login</h3>

          <form
            onSubmit={handleFormSubmit}
            className="mt-12 flex flex-col gap-8"
          >
            <label className='flex flex-col' htmlFor="identifier">
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

            <label className='flex flex-col' htmlFor="pwd">
              <span className='text-white font-medium mb-4'>Password</span>
              <input
                placeholder="******"
                name="password"
                type="password"
                value={formState.password}
                onChange={handleChange}
                className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
              />
            </label>
            {error ? (
              <div>
                <p className="error-text">The provided credentials are incorrect</p>
              </div>
            ) : null}

            <div className='flex flex-row sm:block justify-center'>
              <button
                type="button"
                onClick={handleFormSubmit}
                className='bg-tertiary py-3 px-8 outline-none w-fit text-secondary font-bold shadow-md shadow-primary rounded-xl hover:text-white'
              >
                Go!
              </button>
            </div>
            <div className='flex flex-row sm:block justify-center'>
              <Link to="/signup" className='bg-tertiary py-3 px-8 outline-none w-fit text-secondary font-bold shadow-md shadow-primary rounded-xl hover:text-white'>Dont Have an account?</Link>
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

const Login = () => {
  return (
    <div className='relative z-0 bg-primary w-full h-screen mx-auto'>
      <div className='bg-space-pattern h-screen bg-cover bg-no-repeat bg-center'>
        <Navbar />
        <LoginForm />
      </div>
    </div>
  )
}

export default Login;
