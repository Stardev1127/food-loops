import { useState, useEffect, useMemo } from 'react';
import { get } from '../utils/axios';
/**
 * @param  {string} url
 * @param  {any} params
 * @returns {Array} [error, fetching, response]
 */
export function usePromiseFetch(url, params) {
  params = useMemo(() => ({}), []);

  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFetching(true);
    get(url, params)
      .then((response) => {
        setData(response.data.data);
        setFetching(false);
      })
      .catch((err) => {
        setError(err);
        setFetching(false);
      });
  }, [params]);

  return [fetching, data, error];
}
