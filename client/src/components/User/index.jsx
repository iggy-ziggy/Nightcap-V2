import { motion } from 'framer-motion';
import { styles } from '../../styles';
import { slideIn } from '../../utils/motion';
import React, {useState, useRef, useEffect} from 'react';
import ThoughtForm from '../ThoughtForm';
import { SectionWrapper } from '../../hoc';
import Badges from '../Badges';
import { Tilt } from 'react-tilt';
// import { InputText } from 'primereact/inputtext';
import Auth from '../../utils/auth';
import img from '/no-image.jpg';
import CameraIcon from '/camera-icon.svg';
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';

// Initialize firebase for image storage
const firebaseConfig = {
    apiKey: 'AIzaSyATd-cXIDX-3YQV-rZU4XTAuu1hYUExl60',
    authDomain: 'nightcap-24dad.firebaseapp.com',
    projectId: 'nightcap-24dad',
    storageBucket: 'nightcap-24dad.appspot.com',
    messagingSenderId: '490604626131',
    appId: '1:490604626131:web:61c02ae99f289711fe9426',
  };
  
  firebase.initializeApp(firebaseConfig);
  
  const storage = firebase.storage();
  const storageRef = storage.ref();

function User() {
    const [image, setimage] = useState("");
    const [src, setsrc] = useState(false);
    const [profile, setProfile] = useState([]);
    // const [userId, setUserId] = useState("");
    // const [imageUrls, setImageUrls] = useState([]);
    // const [userData, setUserData] = useState({
    //     userId:""
    //     image: "",
    //   });
    // const [updateUserMutation] = useMutation(UPDATE_USER);

    // const updateUser = () => {
    //     const variables = {
    //     user: userId,
    //     image: imageUrl,
    //   };
    // updateUserMutation({
    //     variables,
    //   })

//     .then((res) => {
//         console.log(res);
//         setImageUrl('');
//       }
//       .catch((err) => {
//         console.error(err);
//         setError("An error occurred while adding the business. Please try again.");
//       });
//   };

// setImageUrl(imageUrl);
//     setUserData((prevData) => ({
//       ...prevData,
//       image: imageUrl,

    const profilePic = profile.map((item) => item.image);

    const saveImage = () => {
        console.log('Image selected');
        setProfile([...profile, { image: image }]);
        console.log('passed setProfile');
        
        if (image || profilePic) {
            const imageRef = storageRef.child(`images/${Auth.getProfile().data.username}_profile.jpg`);
            console.log('Image identified')
            // Upload the image to Firebase Storage.
            imageRef.put(image)
            .then((snapshot) => {
                console.log('Image uploaded to Firebase Storage');
                snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log('Download URL:', downloadURL);
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
            console.log(storedImageURL);
            setsrc(storedImageURL);
        }
    }, []);

    // useEffect(() => {
    //     const profile = AuthService.getProfile();
    //     if (profile) {
    //       const userId = profile.data._id;
    //       console.log(userId);
    //       setUserData({...UserData, user: userId });
    //     }
    //   }, [userId]);

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
                                    src={src || img}
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
                                                saveImage();
                                            } else{
                                                setimage(img);
                                            }
                                        }} />
                                    {/* <button onClick={saveImage}>Save</button> */}
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