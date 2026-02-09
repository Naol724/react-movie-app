import React, { useState, useEffect } from "react";
import axios from "../../utils/axios";
import requests from "../../utils/requests";
import Classes from "./Banner.module.css";

const Banner = () => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals);

        const randomMovie =
          request.data.results[
            Math.floor(Math.random() * request.data.results.length)
          ];

        setMovie(randomMovie);
      } catch (error) {
        console.log("Error fetching movie:", error);
      }
    };

    fetchData();
  }, []);

  const truncate = (str, n) =>
    str?.length > n ? str.slice(0, n - 1) + "…" : str;

  return (
    <div
      className={Classes.banner}
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie?.backdrop_path}")`,
        backgroundPosition: "center center",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className={Classes.banner__contents}>
        <h1 className={Classes.banner__title}>
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className={Classes.banner__buttons}>
          <button className={`${Classes.banner__button} ${Classes.play}`}>Play</button>
          <button className={Classes.banner__button}>My List</button>
        </div>

        <p className={Classes.banner__description}>
          {truncate(movie?.overview, 150)}
        </p>
      </div>

      <div className={Classes.banner__fadeBottom} />
    </div>
  );
};

export default Banner;
