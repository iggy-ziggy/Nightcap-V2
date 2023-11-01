import React, { useState } from "react";
import "./searchBar.css";
import { BiSearchAlt } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';
import { Link } from "react-router-dom";

function SearchBar({placeholder, data, onSearch}) {
    const [filteredData, setFilteredData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");

    const handleFilter = (event) => {
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = data.filter((value) => {
            return value.toLowerCase().includes(searchWord.toLowerCase());
        });
        if (searchWord === "") {
            setFilteredData([]);    
        } else {
            setFilteredData(newFilter);
            onSearch(searchWord);
        }
    };

    const clearInput = () => {
        setFilteredData([]);
        setWordEntered("");
    };

    return (
        <div className="search">
          <div className="searchInputs">
            <input
              type="text"
              placeholder={placeholder}
              value={wordEntered}
              onChange={handleFilter}
            />
            <div className="searchIcon">
              {filteredData.length > 0 ? (
                <BiSearchAlt />
              ) : (
                <AiOutlineClose id="clearBtn" onClick={clearInput} />
              )}
            </div>
          </div>
          {filteredData.length !== 0 && (
            <div className="dataResult">
              {filteredData.slice(0, 10).map((value, key) => {
                return (
                  <Link to={`/item/${value.id}/${value.id}`} key={key}>
                    {value.name}
                  </Link>
                );
              })}
              <Link to={`/search?type=business&q=${wordEntered}`}>
                View More Businesses
              </Link>
              <Link to={`/search?type=user&q=${wordEntered}`}>
                View More Users
              </Link>
            </div>
          )}
        </div>
      );
    }
    

export default SearchBar;