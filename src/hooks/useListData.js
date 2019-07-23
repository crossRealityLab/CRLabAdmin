import { useState, useEffect } from 'react';
import _ from 'lodash';

import { getAll } from '../apis/firebaseApis';


export default endpoint => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await getAll(endpoint);
        setData(_.values(data));
      } catch (e) {
        console.log(`FETCH ${endpoint} LIST ERROR`, e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [endpoint]);

  return { isLoading, setIsLoading, setData, data };
};
