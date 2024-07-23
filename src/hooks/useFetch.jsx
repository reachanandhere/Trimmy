import { useState } from "react";

const useFetch = (cb, options = {}) => {
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);
    try {
      const response = await cb(options, ...args);
      setData(response);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, data, fn };
};

export default useFetch;
