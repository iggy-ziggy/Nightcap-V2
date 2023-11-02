import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import React, {useState, useRef, useEffect} from 'react';
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
import Badges from '../Badges';
import { Tilt } from 'react-tilt';
import Auth from '../../utils/auth';
import img from '/no-image.jpg';
import CameraIcon from '/camera-icon.svg';


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
                            <div 
                                className='bg-tertiary rounded-[180px] py-5 px-5 min-h-[300px] flex justify-evenly items-center flex-col'
                                onMouseEnter={() => {
                                    // On hover, make the camera icon visible
                                    const cameraIcon = document.querySelector('.camera-icon');
                                    cameraIcon.style.display = 'block';
                                }}
                                onMouseLeave={() => {
                                    // On hover exit, hide the camera icon
                                    const cameraIcon = document.querySelector('.camera-icon');
                                    cameraIcon.style.display = 'none';
                                }}>
                                <img
                                    className="profileImage"
                                    id="img-profile"
                                    style={{
                                        width:'200px',
                                        height:'200px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '4px solid blue',
                                        transition: 'transform 0.2s ease-in-out',
                                      }}
                                    src={ img}
                                    alt="Profile Picture" 
                                ></img>
                                <div>
                                    <label 
                                        htmlFor="imageUpload" 
                                        className="camera-icon"
                                        style={{
                                            display: 'none', // Initially, hide the camera icon
                                            position: 'absolute',
                                            top: '50%', 
                                            left: '50%', 
                                            transform: 'translate(-50%, -50%)', // Center the icon using transform
                                        }}>
                                        <img src={CameraIcon} alt="Camera Icon" />
                                    </label>
                                    <input 
                                        type="file"
                                        accept="image/*"
                                        id="imageUpload"
                                        style={{ display: 'none' }}
                                        onChange= {(event)=>{
                                            const file = event.target.files[0];
                                            if(file && file.type.startsWith('image')){
                                                setimage(file);
                                                // saveImage();
                                            } else{
                                                setimage(img);
                                            }
                                        }} />
                                </div>
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