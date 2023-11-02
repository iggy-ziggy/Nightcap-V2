import { motion } from 'framer-motion';
import { styles } from '../styles';
import { BigBallCanvas } from './canvas';
import { ballLogo } from '../constants';

const Hero = () => {
  return (
    <section className='relative w-full h-screen mx-auto'>
      <div className={`${styles.paddingX} absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <div className='flex flex-col justify-center items-center mt-5'>

          <div className='sm:block hidden'>
            <h1 className={`${styles.heroHeadText} text-white`}>Night<span className='text-[#915eff]'>cap</span></h1>
            <p className={`${styles.heroSubText} mt-2 text-white-100 text-center`}>Drink Together</p>
          </div>
          
        </div>
      </div>
      <BigBallCanvas />

    </section>
  )
}

export default Hero