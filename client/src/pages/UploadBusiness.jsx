// import { useState, useEffect } from "react";
// import { useMutation } from "@apollo/client";
// import  { useNavigate }  from "react-router-dom";
// import UploadImage from "../components/UploadImage";
// import AuthService from "../utils/auth";
// import { ADD_BUSINESS } from "../utils/mutations";

// function UploadBusiness() {
//   const [userId, setUserId] = useState("");
//   const [imageUrls, setImageUrls] = useState([]);
//   const [error, setError] = useState(null);
//   const [businessData, setBusinessData] = useState({
//     user: "",
//     name: "",
//     email: "", 
//     image: [],
//     phoneNumber: "",
//     bio: "",
//     website: "",
//     location: "",
//   });
//   const navigateTo = useNavigate();


//   useEffect(() => {
//     const profile = AuthService.getProfile();
//     if (profile) {
//       const userId = profile.data._id;
//       console.log(userId);
//       setBusinessData({...businessData, user: userId });
//     }
//   }, [userId]);

//   useEffect(() => {
//     console.log(businessData);
//   }, [businessData]);

//   const handleBusinessDataChange = (e) => {
//     e.persist();
//     const { name, value } = e.target;
//     setBusinessData({ ...businessData, [name]: value });
//     console.log(businessData);
//   };

//   const [addBusinessMutation] = useMutation(ADD_BUSINESS);

//   const addBusiness = () => {
//     const variables = {
//     user: userId,
//     name: businessData.name,
//     email: businessData.email,
//     image: imageUrls,
//     phoneNumber: businessData.phoneNumber,
//     bio: businessData.bio,
//     website: businessData.website,
//     location: businessData.location,
//   };

//     addBusinessMutation({
//       variables,
//     })
//       .then((res) => {
//         console.log(res);
//         navigateTo(`/business/${res.data.addBusiness._id}`); 
//         setBusinessData({
//           user: "",
//           name: "",
//           email: "",
//           phoneNumber: "",
//           bio: "",
//           image: [],
//           website: "",
//           location: "",
//         });
//         setImageUrls([]);
//       })
//       .catch((err) => {
//         console.error(err);
//         setError("An error occurred while adding the business. Please try again.");
//       });
//   };

//   const handleImageUploaded = (imageUrls) => {
//     console.log('Image URLs:', imageUrls);
//     setImageUrls(imageUrls);
//     setBusinessData((prevData) => ({
//       ...prevData,
//       image: imageUrls,
//     }));
//   };

//   return (
//     <div>
//       <h2>Upload A Business</h2>
//       <div>
//         <label>Upload Image</label>
//         <UploadImage onImageUploaded={handleImageUploaded} />
//       </div>
//       <form onSubmit={addBusiness}>
//         <div>
//           <label>
//             Name*
//             <input
//               type="text"
//               name="name"
//               value={businessData.name}
//               onChange={handleBusinessDataChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>
//             Email
//             <input
//               type="text"
//               name="email"
//               value={businessData.email}
//               onChange={handleBusinessDataChange}
//             />
//           </label>
//         </div>
//         <div>
//           <label>Phone Number</label>
//           <input
//             type="text"
//             name="phoneNumber"
//             value={businessData.phoneNumber}
//             onChange={handleBusinessDataChange}
//           />
//         </div>
//         <div>
//           <label>Bio</label>
//           <input
//             type="text"
//             name="bio"
//             value={businessData.bio}
//             onChange={handleBusinessDataChange}
//           />
//         </div>
//         <div>
//           <label>Website</label>
//           <input
//             type="text"
//             name="website"
//             value={businessData.website}
//             onChange={handleBusinessDataChange}
//           />
//         </div>
//         <div>
//           <label>Location</label>
//           <input
//             type="text"
//             name="location"
//             value={businessData.location}
//             onChange={handleBusinessDataChange}
//           />
//         </div>
//         <div>
//           {error && <div className="error">{error}</div>}
//           <button type="button" onClick={addBusiness}>Submit</button>
//         </div>
//       </form>
//     </div>
//   );
// }

// export default UploadBusiness;