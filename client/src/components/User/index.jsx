import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
import Badges from '../Badges';
import { Tilt } from 'react-tilt';
import Auth from '../../utils/auth';

function User() {
    return (
        <section className='relative w-full h-screen mx-auto'>
            <div className='absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5 sm:flex flex-wrap'>
                <div className='flex flex-col justify-center items-center mt-2'>

                    <Tilt className="xs:w-[300px] w-full">
                        <motion.div
                            variants={slideIn('left', "tween", 0.2, 1)}
                            className='w-full green-pink-gradient p-[1px] rounded-[180px] shadow-card'
                        >
                            <div className='bg-tertiary rounded-[180px] py-5 px-5 min-h-[300px] flex justify-evenly items-center flex-col'>
                                <img
                                    className="w-30 h-30 object-contain rounded-[180px]"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
                                ></img>
                            </div>
                        </motion.div>
                    </Tilt>

                </div>

                <div className='flex flex-col justify-center items-center'>
                    <motion.div
                        variants={slideIn('right', "tween", 0.2, 1)}
                    >
                        <div className='sm:block hidden'>
                            <p className={`${styles.heroHeadText} mt-2 text-center`}>Hello <span className='text-[#915eff]'>{Auth.getProfile().data.username}</span></p>
                        </div>
                    </motion.div>
                    <div className='flex flex-col justify-center items-center mt-5'>
                        <ThoughtForm />
                    </div>
                    <div className='absolute bottom-64 wfull flex justify-center items-center sm:block hidden'>
                        <a href="#thought-list">
                            <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start p-2'>
                                <motion.div 
                                    animate={{
                                        y: [0, 24, 0]
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        repeatType: 'loop',
                                    }}
                                    className='w-3 h-3 rounded-full bg-secondary mb-1'
                                />
                            </div>
                        </a>
                    </div>
                </div>

            </div>

        </section>
    );
}

export default SectionWrapper(User);