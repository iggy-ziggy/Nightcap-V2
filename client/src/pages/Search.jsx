import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useLazyQuery } from '@apollo/client';
import { useNavigate, useParams } from 'react-router-dom';

function ParentComponent() {
  const navigate = useNavigate();
  const { type, searchTerm } = useParams();
  const [searchResults, setSearchResults] = useState([]);

  const [searchBusinesses, { data: businessData }] = useLazyQuery(YOUR_BUSINESS_QUERY);
  const [searchUsers, { data: userData }] = useLazyQuery(YOUR_USER_QUERY);

  useEffect(() => {
    if (type === 'business' && businessData) {
      setSearchResults(businessData.businesses);
    }
    if (type === 'user' && userData) {
      setSearchResults(userData.users);
    }
  }, [type, businessData, userData]);

  const handleSearch = (term, searchType) => {
    setSearchResults([]);

    if (searchType === 'business') {
      searchBusinesses({ variables: { searchTerm: term } });
    } else if (searchType === 'user') {
      searchUsers({ variables: { searchTerm: term } });
    }
  };

  const handleViewMore = (type) => {
    navigate(`/search?type=${type}&q=${searchTerm || 'all'}`);
  };

  return (
    <div>
      <SearchBar placeholder="Search for users or businesses" onSearch={handleSearch} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>
            <img src={result.image} alt={result.name} />
            <span>{result.name}</span>
          </li>
        ))}
      </ul>
      <button onClick={() => handleViewMore('business')}>View More Businesses</button>
      <button onClick={() => handleViewMore('user')}>View More Users</button>
    </div>
  );
}

export default ParentComponent;