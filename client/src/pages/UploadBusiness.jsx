import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import UploadImage from "../components/UploadImage";
import AuthService from "../utils/auth";
import { ADD_BUSINESS } from "../utils/mutations";

function UploadBusiness() {
  const [userId, setUserId] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [businessData, setBusinessData] = useState({
    user: "",
    name: "",
    email: "", 
    images: [],
    phoneNumber: "",
    bio: "",
    website: "",
    location: "",
  });


  useEffect(() => {
    const profile = AuthService.getProfile();
    if (profile) {
      setUserId(profile.data._id);
    }
  }, []); // Add an empty dependency array to run this effect once

  const handleBusinessDataChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...businessData, [name]: value }); // Fix variable name
  };

  const handleImageUploaded = (imageUrls) => {
    console.log('Image URLs:', imageUrls);
    setImageUrls(imageUrls);
    console.log('Updated Business Data:', businessData);
    setBusinessData((prevData) => ({
      ...prevData,
      images: imageUrls,
    }));
    console.log('Updated Business Data:', businessData);
  };

  const [addBusinessMutation] = useMutation(ADD_BUSINESS);

  const addBusiness = () => {
    const variables = {
      user: userId,
      name: businessData.name,
      email: businessData.email,
      images: imageUrls,
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
        setBusinessData({
          user: "",
          name: "",
          email: "",
          phoneNumber: "",
          bio: "",
          images: [],
          website: "",
          location: "",
        });
        setImageUrls([]); // Reset image URLs
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <h2>Upload A Business</h2>
      <div>
        <label>Upload Images</label>
        <UploadImage onImageUploaded={handleImageUploaded} />
      </div>
      <form onSubmit={addBusiness}>
        <div>
          <label>
            Name*
            <input
              type="text"
              name="name"
              value={businessData.name}
              onChange={handleBusinessDataChange}
            />
          </label>
        </div>
        <div>
          <label>
            Email
            <input
              type="text"
              name="email"
              value={businessData.email}
              onChange={handleBusinessDataChange}
            />
          </label>
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={businessData.phoneNumber}
            onChange={handleBusinessDataChange}
          />
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            value={businessData.bio}
            onChange={handleBusinessDataChange}
          />
        </div>
        <div>
          <label>Website</label>
          <input
            type="text"
            name="website"
            value={businessData.website}
            onChange={handleBusinessDataChange}
          />
        </div>
        <div>
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={businessData.location}
            onChange={handleBusinessDataChange}
          />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
}

export default UploadBusiness;