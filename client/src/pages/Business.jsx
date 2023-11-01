import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_BUSINESS } from '../utils/queries'; 
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList'; 

function Business() {
  const [businessData, setBusinessData] = useState({});
  const [thoughts, setThoughts] = useState([]);
  const { businessId } = useParams(); 

  const { loading, error, data } = useQuery(QUERY_BUSINESS, {
    variables: { businessId },
  });

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
    return <div>Error loading business data.</div>; 
  }

  useEffect(() => {
    if (data && data.business) {
      setBusinessData(data.business);
      setThoughts(data.business.thoughts);
    }
  }, [data]);

  return (
    <div>
      <div>
        {businessData && (
          <div className="card">
            <h3>{businessData.name}</h3>
            <img src={businessData.image} alt={businessData.name} />
            <p>{businessData.bio}</p>
            <p>{businessData.email}</p>
            <p>{businessData.location}</p>
            <p>{businessData.website}</p>
          </div>
        )}
        <ThoughtForm businessId={businessId} />
        <ThoughtList thoughts={thoughts} title={`Thoughts about ${businessData.name}`} />
      </div>
    </div>
  );
}

export default Business;