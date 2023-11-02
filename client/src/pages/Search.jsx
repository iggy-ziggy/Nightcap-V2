import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_BUSINESSES, QUERY_USERS } from '../utils/queries';
import { Link } from 'react-router-dom';

function Search() {
  const [combinedData, setCombinedData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loadMoreCount, setLoadMoreCount] = useState(20);
  const { loading: usersLoading, error: usersError, data: userData } = useQuery(QUERY_USERS);
  const { loading: businessesLoading, error: businessesError, data: businessData } = useQuery(QUERY_BUSINESSES);
  const { searchType } = useParams();

  useEffect(() => {
    if (!usersLoading && !businessesLoading && userData && businessData) {
      const combinedData = [
        ...userData.users.map((user) => ({
          id: user._id,
          type: 'user',
          name: user.username,
          image: user.image?.[0] || '',
        })),
        ...businessData.businesses.map((business) => ({
          id: business.__id,
          type: 'business',
          name: business.name,
          image: business.image?.[0] || '',
        })),
      ];
      setCombinedData(combinedData);
      console.log(combinedData);
    }
  }, [usersLoading, businessesLoading, userData, businessData]);

  useEffect(() => {
    let filteredItems = combinedData;
    if (searchType) {
      filteredItems = combinedData.filter((item) => item.type === searchType);
    }
    setFilteredData(filteredItems.slice(0, loadMoreCount));
  }, [combinedData, searchType, loadMoreCount]);

  const loadMore = () => {
    setLoadMoreCount(loadMoreCount + 20);
  };

  const renderContent = () => {
    if (filteredData.length === 0) {
      return <div>No Results Found</div>;
    }

    return (
      <div className="results">
        {filteredData.map((item) => (
          <Link key={item.id} to={`/${item.type}/${item.id}`} className="resultLink">
            <div className="result">
              {item.image ? (
                <img className="resultImg" src={item.image} alt={item.name} />
              ) : (
                <img
                  className="resultImg"
                  src="placeholder-image-url" // Replace with your placeholder image URL
                  alt={item.name}
                />
              )}
              <div className="resultInfo">
                <div className="resultName">{item.name}</div>
                <div className="resultType">{item.type}</div>
              </div>
            </div>
          </Link>
        ))}
        {loadMoreCount < filteredData.length && (
          <button onClick={loadMore}>Load More</button>
        )}
      </div>
    );
  };

  return (
    <div>
      <div>
        <SearchBar placeholder="Search for users or businesses..." data={combinedData} />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
}

export default Search;