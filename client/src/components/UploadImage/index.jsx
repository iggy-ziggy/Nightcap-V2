// import "./uploadPicture.css";
import React, { useState, useEffect, Component } from "react";
// import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Firebase from "../../utils/firebase";
// import { v4 } from "uuid";
// import PropTypes from 'prop-types';
import img from '/no-image.jpg';
import CameraIcon from '/camera-icon.svg';

// function UploadImage({ onImageUploaded }) {
//   const [selectedImages, setSelectedImages] = useState([]);
//   const [imagePreviews, setImagePreviews] = useState([]);
//   const [uploadMessage, setUploadMessage] = useState("");
//   const [error, setError] = useState(null);
//   // const [ uploadProgress, setUploadProgress] = useState(0);


//   UploadImage.propTypes = {
//     onImageUploaded: PropTypes.func.isRequired, // Validate that onImageUploaded is a function and is required.
//   };

//   const uploadFile = () => {
//     if (selectedImages === null || selectedImages.length === 0) return;

//     const uploadedPromises = selectedImages.map((image) => {
//       const imageRef = ref(storage, `images/${image.name + v4()}`);
//       return uploadBytes(imageRef, image)
//         .then((snapshot) => getDownloadURL(snapshot.ref))
//         .catch((error) => {
//           setError("Error uploading images. Please try again.");
//           return null;
//         });
//     });

//     Promise.all(uploadedPromises)
//       .then((urls) => {
//         if (urls.every((url) => url !== null)) {
//           onImageUploaded(urls);
//           setImagePreviews(urls);
//           console.log(urls);
//           setSelectedImages([]);
//           setUploadMessage("Images were successfully uploaded.");
//           setImagePreviews(urls);
//         }
//       })
//       .catch((error) => {
//         console.error("Error uploading images:", error);
//         setError("Error uploading images. Please try again.");
//       });
//   };

//   useEffect(() => {
//     if (selectedImages.length === 0) {
//       setImagePreviews([]);
//       setError(null);
//     } else {
//       // Generate image previews for selected images
//       const previews = selectedImages.map((image) => {
//         return URL.createObjectURL(image);
//       });
//       setImagePreviews(previews);
//     }
//   }, [selectedImages]);

//   return (
//     <div className = "upload">
//       <div 
//         className='bg-tertiary rounded-full p-5 min-h-[300px] flex justify-center items-center flex-col'
//         onMouseEnter={() => {
//             // On hover, make the camera icon visible
//             const cameraIcon = document.querySelector('.camera-icon');
//             cameraIcon.style.display = 'block';
//         }}
//         onMouseLeave={() => {
//             // On hover exit, hide the camera icon
//             const cameraIcon = document.querySelector('.camera-icon');
//             cameraIcon.style.display = 'none';
//         }}>
//           <label 
//               htmlFor="profileImage" 
//               className="camera-icon"
//               style={{
//                   display: 'none', // Initially, hide the camera icon
//                   position: 'absolute',
//                   top: '50%', 
//                   left: '50%', 
//                   transform: 'translate(-50%, -50%)', // Center the icon using transform
//               }}>
//               <img src={CameraIcon} alt="Camera Icon" />
//               </label>
//               <input
//                 id="profileImage"
//                 type="file"
//                 accept="image/*"
//                 style={{ display: 'none' }}
//                 onChange={(event) => {
//                   setSelectedImages(Array.from(event.target.files));
//                   setError(null);
//                   uploadFile;
//                 }}
//                 // multiple
//               />

//           <div className = "imgs">
//             {imagePreviews.length > 0 &&
//               imagePreviews.map((preview, index) => (
//                 <img 
//                   src={preview || img}
//                   alt={`Selected ${index}`}
//                   key={`preview-${index}`} 
//                   style={{
//                     width:'200px',
//                     height:'200px',
//                     borderRadius: '50%',
//                     objectFit: 'cover',
//                     border: '4px solid blue',
//                     transition: 'transform 0.2s ease-in-out',
//                 }}
//                 />
//               ))}
//             {uploadMessage && <p>{uploadMessage}</p>}
//             {error && <p className="error">{error}</p>}
//           </div>
//         </div>
//     </div>
//   );
// }




class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
    this.setFileState = this.setFileState.bind(this);
    this.fileUpload = this.fileUpload.bind(this);
  }
  setFileState = (e) => {
    this.setState({ [e.target.name]: e.target.files[0] });
  };
  fileUpload = (e) => {
    e.preventDefault();
    // if no file is selected
    if (!this.state.file) {
      console.log("please select a file");
    } else {
      // send file to the database
      const storageRef = Firebase.db.ref('fileupload/' + this.state.file.name);
      storageRef.put(this.state.file);
      storageRef.getMetadata().then(res => {
        document.getElementById('fileDiv').innerText = 'fileName: ' + res.name + ', fileSize: ' + res.size + "b" 
      })
    }
  };
  render() {
    return (
      <div id="fileDiv">
        <form>
          <label>
            <input type="file" name="file" onChange={this.setFileState} />
          </label>
          <br />
          <input type="submit" value="Submit" onClick={this.fileUpload} />
        </form>
      </div>
    );
  }
}

export default UploadImage;
