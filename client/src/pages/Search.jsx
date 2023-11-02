import React from 'react';
import SearchBar from '../components/SearchBar';

function MainSearch({ users, businesses }) {
  const businessNames = businesses.map(business => business.name);
//   const cocktailNames = cocktails.map(cocktail => cocktail.name);
  const userNames = users.map(user => user.username);
  const searchData = [...businessNames, ...userNames];
//   const searchData = [...businessNames, ...cocktailNames, ...userNames];


  return (
    <div>
      {/* <SearchBar placeholder="Search for users or businesses" data={searchData} />
    </div>
    <div> */}
        
    </div>
  );
}

export default MainSearch;