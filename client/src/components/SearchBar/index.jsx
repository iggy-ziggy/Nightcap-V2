import React, { useState } from "react";
import "./searchBar.css";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';
import { BiSearchAlt, BiZoomIn } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

function SearchBar({ placeholder, data, onFilter, onSearch }) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const NavigateTo = useNavigate();

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            clearInput();
            handleSearch();
        }
    }

    const handleSearch = () => {
      clearInput();
      if (onSearch) {
        onSearch(wordEntered);
        NavigateTo(`/search?q=${wordEntered}`);
      } else if (users) {
        NavigateTo(`/search?q=${wordEntered}&type=users`);
      } else {
        NavigateTo(`/search?q=${wordEntered}&type=business`);
      }
    };


    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    const filterData = (event) => {
      const searchWord = event.target.value;
      const sanitizedSearchWord = searchWord.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
      setWordEntered(searchWord);
      console.log(sanitizedSearchWord);
    
      const newFilter = data.filter((item) => {
        const sanitizedItemName = item.name.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
        return sanitizedItemName.includes(sanitizedSearchWord);
      });
    
      if (searchWord === "") {
        setFilteredData([]);
      } else {
        setFilteredData(newFilter);
        onFilter(newFilter);
      }
    };


  return (
    <div className="search justify-center items-center">
      <div className="searchInputs">
        <input type="text" className="Input" placeholder={placeholder} value={wordEntered} onChange={handleFilter} onKeyDown={handleKeyDown} />
        <div className="searchIcon">
          {filteredData.length > 0 ? <BiSearchAlt onClick={handleSearch} /> : <AiOutlineClose id="clearBtn" onClick={clearInput} />}
        </div>
      </div>
      {filteredData.length !== 0 && (
        <div className="dataResult">
          {filteredData.slice(0, 15).map((value, key) => {
            const itemLink = value.type === "business" ? `/business/${value.id}` : `/profile/${value.id}`;
            return (
              <Link to={itemLink} key={key}>
                <div className="data">
                  <div>
                    {value.image ? (
                      <img className="dataImg" src={value.image} alt={value.name} />
                    ) : (
                      <img
                        className="dataImg"
                        src="https://placeholder.pics/svg/200x200/757575-ADADAD/FFFFFF/IMAGE%20UNAVAILABLE"
                        alt="Placeholder"
                      />
                    )}
                  </div>
                  <div className="dataInfo">
                    <div>{value.name}</div><div>{value.type}</div>
                  </div>
                </div>
              </Link>
            );
          })}
          <div className="links">
            <Link
              to={`/search?q=${wordEntered}&type=business`}
              style={{
                color: 'text-secondary',
                hover: 'text-primary',
              }}
            >
              View More Businesses
            </Link>
            <Link to={`/search?q=${wordEntered}&type=user`}>
              View More Users
            </Link>
          </div>
        </div>
      )
      }
    </div >
  );
}

SearchBar.propTypes = {
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string, // Allow null or string
  })).isRequired,
  handleFilter: PropTypes.func.isRequired,
};

export default SearchBar;