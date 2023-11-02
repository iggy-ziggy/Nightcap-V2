import { React, useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useQuery } from '@apollo/client';
import { QUERY_BUSINESSES, QUERY_USERS } from '../utils/queries';
import { Link } from'react-router-dom';

function Search() {
    const [combinedData, setCombinedData] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [selectedTab, setSelectedTab] = useState('businesses');
    const { loading: usersLoading, error: usersError, data: userData } = useQuery(QUERY_USERS);
    const { loading: businessesLoading, error: businessesError, data: businessData } = useQuery(QUERY_BUSINESSES);
    const { searchWord, searchType } = useParams();
    const navigate = useNavigate();
    const Tab = createMaterialTopTabNavigator();

    useEffect(() => {
        if (!usersLoading && !businessesLoading && userData && businessData) {
            const combinedData = [
                ...userData.users.map(user => ({
                    id: user._id,
                    type: 'user',
                    name: user.username,
                    image: user.image?.[0] || '',
                })),
                ...businessData.businesses.map(business => ({
                    id: business._id,
                    type: 'business',
                    name: business.name,
                    image: business.image?.[0] || '',
                })),
            ];
            setCombinedData(combinedData);
        }
    }, [usersLoading, businessesLoading, userData, businessData]);

    const handleTabChange = (e) => {
        const newTab = e.selectedTab;
        setSelectedTab(newTab);
        // Update URL params with the new tab
        navigate(`/search?q=${searchWord}&type=${newTab}`);
    };

    useEffect(() => {
        // Filter businesses and users based on the selected tab
        if (selectedTab === 'businesses') {
            const businessFilter = combinedData.filter(item => item.type === 'business');
            setFilteredBusinesses(businessFilter.slice(0, 20));
        } else if (selectedTab === 'users') {
            const userFilter = combinedData.filter(item => item.type === 'user');
            setFilteredUsers(userFilter.slice(0, 20));
        }
    }, [combinedData, selectedTab]);

    const renderBusinesses = () => {
        return (
            <div className="businesses">
                {filteredBusinesses.map(business => (
                    <div key={business.id} className="business">
                        <img className="businessImg" src={business.image} alt={business.name} />
                        <div className="businessInfo">
                            <div className="businessName">{business.name}</div>
                            <div className="businessType">{business.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const renderUsers = () => {
        return (
            <div className="users">
                {filteredUsers.map(user => (
                    <div key={user.id} className="user">
                        <img className="userImg" src={user.image} alt={user.name} />
                        <div className="userInfo">
                            <div className="userName">{user.name}</div>
                            <div className="userType">{user.type}</div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };


    return (
        <div>
            <div>
                <SearchBar placeholder="Search for users or businesses..." data={combinedData} />
            </div>
            <div>
                <Tab.Navigator heightAdjustMode="Auto" selected={selectedTab} selectedIndexChanged={handleTabChange}>
                    <Tab.Screen name="Business" component={renderBusinesses} />
                    <Tab.Screen name="User" component={renderUsers} />
                </Tab.Navigator >
            </div>
        </div>
    );
}

export default Search;