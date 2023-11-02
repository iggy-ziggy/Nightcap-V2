import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import React, {useState, useRef, useEffect} from 'react';
import { useMutation } from "@apollo/client";
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
// import Badges from '../Badges';
import { Tilt } from 'react-tilt';
import Auth from "../../utils/auth";
import UploadImage from "../../components/UploadImage";
import { UPDATE_USER } from "../../utils/mutations";

function User() {
    const [userId, setUserId] = useState("");
    const [imageUrl, setImageUrl] = useState([]);
    const [userData, setUserData] = useState({
        userId:"",
        image: "",
    });
     
    useEffect(() => {
        const profile = Auth.getProfile();
        if (profile) {
          const userId = profile.data._id;
          console.log(userId);
          setUserData({...userData, user: userId });
        }
    }, [userId]);
    
    useEffect(() => {
        console.log(userData);
    }, [userData]);
    
    const [updateUserMutation] = useMutation(UPDATE_USER);
    const updateUser = () => {
        const variables = {
        user: userId,
        image: imageUrl,
      };
    
        updateUserMutation({
            variables,
        })
        .then((res) => {
            console.log(res);
            setImageUrl('');
        })
        .catch((err) => {
            console.error(err);
            setError("An error occurred while adding the business. Please try again.");
        });
    };
    
    const handleImageUploaded = (imageUrl) => {
        console.log('Image URLs:', imageUrl);
        setImageUrl(imageUrl);
        setUserData((prevData) => ({
            ...prevData,
            image: imageUrl,
        }));
    };

    return (
        <section className='relative w-full h-screen mx-auto'>
            <div className='absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5 sm:flex flex-wrap'>
                <div className='flex flex-col justify-center items-center mt-2'>
                    <Tilt className="xs:w-[300px] w-full">
                        <motion.div
                            variants={slideIn('left', "tween", 0.2, 1)}
                            className='w-full green-pink-gradient p-[1px] rounded-[180px] shadow-card'>
                            
                            <UploadImage onImageUploaded={handleImageUploaded}/>
                        
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