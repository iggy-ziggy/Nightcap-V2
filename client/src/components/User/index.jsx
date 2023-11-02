import { motion } from 'framer-motion';
import React, {useState, useRef, useEffect} from 'react';
import { useMutation } from "@apollo/client";
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
import Badges from '../Badges';
import { Tilt } from 'react-tilt';
import Auth from '../../utils/auth';
import UploadImage from "../../components/UploadImage";
// import CameraIcon from '/camera-icon.svg';
import { UPDATE_USER } from "../../utils/mutations";

function User() {
    const [userId, setUserId] = useState("");
    const [imageUrl, setImageUrl] = useState([]);
    const [userData, setUserData] = useState({
        userId: "",
        image: "",
    });

    const handleImageUploaded = (imageUrl) => {
        console.log('Image URLs:', imageUrl);
        setImageUrl(imageUrl);
        setUserData((prevData) => ({
            ...prevData,
            image: imageUrl,
        }));
        updateUser();
    };

    useEffect(() => {
        const profile = Auth.getProfile();
        if (profile) {
            const userId = profile.data._id;
            console.log(userId);
            setUserData({ ...userData, user: userId });
        }
    }, []);

    useEffect(() => {
        if (userId && imageUrl) {
            updateUser();
        }
    }, [userId, imageUrl]);

    const [updateUserMutation] = useMutation(UPDATE_USER);

    const updateUser = () => {
        const variables = {
            user: userId,
            image: imageUrl,
        };

        console.log(variables);

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



    return (
        <section className='relative w-full h-screen mx-auto'>
            <div className='absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5 sm:flex flex-wrap'>
                <div className='flex flex-col justify-center items-center mt-2'>

                    <Tilt className="w-full md:block hidden">
                        <motion.div
                            variants={slideIn('left', "tween", 0.2, 1)}
                            className='w-full green-pink-gradient p-[1px] rounded-[180px] shadow-card'
                        >
                            <div className='bg-tertiary rounded-[180px] py-5 px-5 flex justify-evenly items-center flex-col'
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

                                <label>Upload Image</label>
                                <UploadImage
                                    onImageUploaded={handleImageUploaded}
                                    id="img-profile"
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        borderRadius: '50%',
                                        objectFit: 'cover',
                                        border: '4px solid blue',
                                        transition: 'transform 0.2s ease-in-out',
                                    }}
                                />
                                {/* <img
                                    className="w-30 h-30 object-contain rounded-[180px]"
                                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTwnwAwRQEwRvQYCfXAgvnKUKjQ1KJKlNY2Yw&usqp=CAU"
                                ></img> */}
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
                    <div className='absolute bottom-20 wfull flex justify-center items-center sm:block hidden'>
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