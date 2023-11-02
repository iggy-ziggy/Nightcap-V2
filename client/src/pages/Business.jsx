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
  
  useEffect(() => {
    if (!loading && !error && data && data.business) {
      console.log(data);
      setBusinessData(data.business);
      setThoughts(data.business.thoughts);
    }
  }, [loading, error, data, businessId]);

  if (loading) {
    return <div>Loading...</div>;
  } else if (error) {
    console.error(error);
    return <div>Error loading business data.</div>;
  }

  return (
    <div>
      <div>
        {businessData && (
          <div className="card">
            <div>
            {businessData.image && businessData.image.length > 0 && (
              <img src={businessData.image[0]} alt={businessData.name} />
            )}
            </div>
            <div>
            <h3>{businessData.name}</h3>
            {businessData.bio && <p>{businessData.bio}</p>}
            {businessData.email && <p>{businessData.email}</p>}
            {businessData.location && <p>{businessData.location}</p>}
            {businessData.website && <p>{businessData.website}</p>}
            </div>
          </div>
        )}
        <ThoughtForm businessId={businessId} />
        <ThoughtList thoughts={thoughts} title={`Thoughts about ${businessData.name}`} />
      </div>
    </div>
  );
}

export default Business;