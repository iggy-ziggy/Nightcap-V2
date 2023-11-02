import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { QUERY_BUSINESS } from '../utils/queries';
import ThoughtForm from '../components/ThoughtForm';
import ThoughtList from '../components/ThoughtList';
import { Navbar, SideNav } from '../components';
import { styles } from '../styles';

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
    <div className='relative z-0 bg-primary'>
      <Navbar />
      <div className={`${styles.paddingX} bg-primary relative absolute inset-0 top-[120px] max-w-7x1 mx-auto flex flex-row items-start gap-5`}>
        <SideNav />
        <div className='flex flex-col px-6 justify-center items-center'>
          {businessData && (
            <div className="card">
              <div>
                {businessData.image && businessData.image.length > 0 && (
                  <img className='h-64 w-64' src={businessData.image[0]} alt={businessData.name} />
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
        {/* {businessData && (
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
        <ThoughtList thoughts={thoughts} title={`Thoughts about ${businessData.name}`} /> */}
      </div>
    </div>
  );
}

export default Business;