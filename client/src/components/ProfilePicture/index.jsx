import React from 'react';

const ProfilePicture = ({ user }) => {
  const { image, username } = user;

  return (
    <div className="user-profile-picture">
      <img src={image} alt={`${username}'s profile`} />
    </div>
  );
};

export default ProfilePicture;