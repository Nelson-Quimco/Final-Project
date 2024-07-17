import React, { useEffect, useState } from "react";
import axios from "axios";

const useWeather = () => {
  const [data, setData] = useState<weatherType | null>();

  const getWeather = async () => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=cebu&appid=${process.env.NEXT_PUBLIC_API_KEY}`
      );
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWeather();
  }, []);

  return { data };
};

export default useWeather;
