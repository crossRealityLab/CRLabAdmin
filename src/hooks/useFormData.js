import { useEffect, useState } from 'react';
import { get } from '../apis/firebaseApis';


export default (endpoint = '', uuid = '') => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await get(endpoint, uuid);
        if(data) {
          setData(data);
        }  
      } catch (e) {
        console.log(`FETCH ${uuid} AT ${endpoint} ERROR`, e);
      } finally {
        setIsLoading(false);
      }
    };

    if(uuid) {
      fetchData();
    } else {
      setIsLoading(false);
    }
  }, [endpoint, uuid]);

  return { data, isLoading };
};
