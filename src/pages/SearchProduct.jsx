import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import VerticalCard from '../components/VerticalCard.jsx';

const SearchProduct = () => {
  const query = useLocation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

 

  const fetchProduct = async () => {
    setLoading(true);
    try {
   
      const response = await axios.get(`${process.env.REACT_APP_BACK_END}/search${query.search}`);
      setData(response.data.data);
      
      
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [query]);

  return (
    <div className="container mt-4">
      {loading && <p className="text-center fs-4">Loading...</p>}

      <p className="fs-5 fw-bold my-3">Search Results: {data.length}</p>

      {data.length === 0 && !loading && (
        <p className="alert alert-warning text-center fs-5">No Data Found...</p>
      )}

      {data.length !== 0 && !loading && (
        <VerticalCard loading={loading} data={data} />
      )}
    </div>
  );
};

export default SearchProduct;
