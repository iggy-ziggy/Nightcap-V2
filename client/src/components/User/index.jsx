import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import React, {useState, useRef, useEffect} from 'react';
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
import Badges from '../Badges';
import { Tilt } from 'react-tilt';
import { InputText } from 'primereact/inputtext';
import Auth from '../../utils/auth';
import img from '/no-image.jpg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

function User() {
    const [image, setimage] = useState("");
    const [src, setsrc] = useState(false);
    const [profile, setProfile] = useState([]);

    const profilePic = profile.map((item) => item.image);

    const saveImage = () => {
        setProfile([...profile, { IMAGE: image }]);

        if (image) {
            const imageRef = storageRef.child(`images/${Auth.getProfile().data.username}_profile.jpg`);
            // Upload the image to Firebase Storage.
            imageRef.put(image)
            .then((snapshot) => {
                console.log('Image uploaded to Firebase Storage');
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                setsrc(downloadURL);
                // store image in local storage
                localStorage.setItem('profileImage', downloadURL);
                });
            })
            .catch((error) => {
                console.error('Error uploading image to Firebase Storage:', error);
            });
        }
    }

    useEffect(() => {
        // Retrieve the image URL from localStorage
        const storedImageURL = localStorage.getItem('profileImage');

        if (storedImageURL) {
            setsrc(storedImageURL);
        }
    }, []);

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
                                    className="profileImg"
                                    style={{
                                        width:'200px',
                                        height:'200px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '4px solid blue',
                                      }}
                                    src={src || img}
                                    alt="Profile Picture" 
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