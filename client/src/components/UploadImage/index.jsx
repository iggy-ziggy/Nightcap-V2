import "./uploadPicture.css";
import React, { useState, useEffect } from "react";
import { ref, uploadBytes, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import storage from "../../utils/firebase";
import { v4 } from "uuid";
import PropTypes from 'prop-types';

function UploadImage({ onImageUploaded }) {
  const [selectedImages, setSelectedImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadMessage, setUploadMessage] = useState("");
  const [error, setError] = useState(null);
  const [ uploadProgress, setUploadProgress] = useState(0);


  UploadImage.propTypes = {
    onImageUploaded: PropTypes.func.isRequired, // Validate that onImageUploaded is a function and is required.
  };

  const uploadFile = () => {
    if (selectedImages === null || selectedImages.length === 0) return;

    const uploadedPromises = selectedImages.map((image) => {
      const imageRef = ref(storage, `images/${image.name + v4()}`);
      return uploadBytes(imageRef, image)
        .then((snapshot) => getDownloadURL(snapshot.ref))
        .catch((error) => {
          setError("Error uploading images. Please try again.");
          return null;
        });
    });

    Promise.all(uploadedPromises)
      .then((urls) => {
        if (urls.every((url) => url !== null)) {
          onImageUploaded(urls);
          setImagePreviews(urls);
          console.log(urls);
          setSelectedImages([]);
          setUploadMessage("Images were successfully uploaded.");
        }
      })
      .catch((error) => {
        console.error("Error uploading images:", error);
        setError("Error uploading images. Please try again.");
      });
  };

  useEffect(() => {
    if (selectedImages.length === 0) {
      setImagePreviews([]);
      setError(null);
    } else {
      // Generate image previews for selected images
      const previews = selectedImages.map((image) => {
        return URL.createObjectURL(image);
      });
      setImagePreviews(previews);
    }
  }, [selectedImages]);

  return (
    <div className = "upload">
      <input
        type="file"
        onChange={(event) => {
          setSelectedImages(Array.from(event.target.files));
          setError(null);
        }}
        // multiple
      />
      <button onClick={uploadFile}>Upload Images</button>
      <div className = "imgs">
        {imagePreviews.length > 0 &&
          imagePreviews.map((preview, index) => (
            <img src={preview} alt={`Selected ${index}`} key={`preview-${index}`} />
          ))}
        {uploadMessage && <p>{uploadMessage}</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
}

export default UploadImage;