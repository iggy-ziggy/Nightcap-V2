import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import UploadImage from "../components/UploadImage";
import AuthService from "../utils/auth";
import { ADD_BUSINESS } from "../utils/mutations";
import { motion } from "framer-motion";
import { slideIn } from "../utils/motion";
import { styles } from "../styles";
import { BigBallCanvas, Navbar, SideNav } from "../components";

function UploadBusiness() {
  const [userId, setUserId] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [error, setError] = useState(null);
  const [businessData, setBusinessData] = useState({
    user: "",
    name: "",
    email: "",
    image: [],
    phoneNumber: "",
    bio: "",
    website: "",
    location: "",
  });
  const navigateTo = useNavigate();


  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile) {
      const userId = profile.data._id;
      console.log(userId);
      setBusinessData({ ...businessData, user: userId });
    }
  }, [userId]);

  useEffect(() => {
    console.log(businessData);
  }, [businessData]);

  const handleBusinessDataChange = (e) => {
    e.persist();
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value });
    console.log(businessData);
  };

  const [addBusinessMutation] = useMutation(ADD_BUSINESS);

  const addBusiness = () => {
    const variables = {
      user: userId,
      name: businessData.name,
      email: businessData.email,
      image: imageUrls,
      phoneNumber: businessData.phoneNumber,
      bio: businessData.bio,
      website: businessData.website,
      location: businessData.location,
    };

    addBusinessMutation({
      variables,
    })
      .then((res) => {
        console.log(res);
        navigateTo(`/business/${res.data.addBusiness._id}`);
        setBusinessData({
          user: "",
          name: "",
          email: "",
          phoneNumber: "",
          bio: "",
          image: [],
          website: "",
          location: "",
        });
        setImageUrls([]);
      })
      .catch((err) => {
        console.error(err);
        setError("An error occurred while adding the business. Please try again.");
      });
  };

  const handleImageUploaded = (imageUrls) => {
    console.log('Image URLs:', imageUrls);
    setImageUrls(imageUrls);
    setBusinessData((prevData) => ({
      ...prevData,
      image: imageUrls,
    }));
  };

  return (
    <div className='h-full z-0 bg-primary'>
      <Navbar />
      <div className={`${styles.paddingX} h-full relative inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <SideNav />
        <div className='w-full gap-10 mx-auto relative'>
          <div className="flex flex-col gap-10 flex-[0.75] bg-black-100 p-8 rounded-2xl w-full">
            <p className={styles.sectionSubText}>New to us?</p>
            <h3 className={styles.sectionHeadText}>Start here!</h3>

            <div>
              <label>Upload Image</label>
              <UploadImage onImageUploaded={handleImageUploaded} />
            </div>

            <form
              onSubmit={addBusiness}
              className="mt-12 flex flex-col gap-8"
            >
              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Business Name</span>
                <input
                  placeholder="Business Name"
                  type="text"
                  name="name"
                  value={businessData.name}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Email</span>
                <input
                  placeholder="youremail@test.com"
                  type="text"
                  name="email"
                  value={businessData.email}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Phone Number</span>
                <input
                  placeholder="000-000-0000"
                  type="text"
                  name="phoneNumber"
                  value={businessData.phoneNumber}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Description</span>
                <textarea
                  placeholder="Tell us about your business"
                  rows="4"
                  type="text"
                  name="bio"
                  value={businessData.bio}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Website</span>
                <input
                  placeholder="Paste your link here"
                  type="text"
                  name="website"
                  value={businessData.website}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>

              <label className='flex flex-col'>
                <span className='text-white font-medium mb-4'>Location</span>
                <input
                  placeholder="Location"
                  type="text"
                  name="location"
                  value={businessData.location}
                  onChange={handleBusinessDataChange}
                  className='bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outlined-none border-none font-medium'
                />
              </label>
              <div className='flex flex-row sm:block justify-center'>
                {error && <div className="error">{error}</div>}
                <button
                  type="button"
                  className='bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl'
                  onClick={addBusiness}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadBusiness;