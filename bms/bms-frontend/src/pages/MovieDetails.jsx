import React from "react";
import { filters } from "../utils/constants";
import TheatreTimings from "../components/movies/TheatreTimings";
import m4 from "../assets/m4.avif";

const MovieDetails = () => {
  const movie = {
    id: 4,
    title: "F1: The Movie",
    genre: ["Action", "Drama", "Sports"],
    rating: 9.5,
    votes: "6.8K",
    img: m4,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    format: ["2D", "3D", "IMAX 3D"],
    certification: "UA16+",
    duration: "2h 24m",
    releaseDate: "2023-09-15",
    description: `F1: The Movie is a thrilling documentary that takes you behind the scenes of the high-octane world of Formula 1 racing. Directed by the acclaimed filmmaker, this movie offers an in-depth look at the 2023 Formula 1 season, showcasing the intense competition, cutting-edge technology, and the personal stories of the drivers and teams. With breathtaking footage from some of the most iconic circuits around the globe, F1: The Movie captures the speed, precision, and drama that define this exhilarating sport. Whether you're a die-hard F1 fan or new to the world of motorsport, this film promises an unforgettable cinematic experience that celebrates the passion and dedication of everyone involved in Formula 1.`,
  };

  return (
    <>
      {/* Movie Details Section */}
      <div
        className="relative text-white font-sans px-4 py-10"
        style={{
          backgroundImage: `url(${movie.img})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/70"></div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col lg:flex-row gap-10">
          
          {/* Poster */}
          <div>
            <img
              src={movie.img}
              alt={movie.title}
              className="rounded-xl w-56 shadow-2xl"
            />
          </div>

          {/* Movie Info */}
          <div className="flex-1">
            <h1 className="text-4xl font-bold mb-5">
              {movie.title}
            </h1>

            {/* Rating */}
            <div className="bg-[#2a2a2a] w-fit px-5 py-3 rounded-xl flex items-center gap-4 mb-5">
              <span className="text-pink-500 font-bold text-lg">
                ★ {movie.rating}
              </span>

              <span className="text-gray-300">
                {movie.votes} Votes
              </span>

              <button
                className="bg-[#444] px-4 py-2 rounded-lg text-sm
                hover:bg-[#555] transition cursor-pointer"
              >
                Rate now
              </button>
            </div>

            {/* Format & Languages */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
              <span className="bg-[#2a2a2a] px-3 py-1 rounded-md text-sm">
                {movie.format.join(", ")}
              </span>

              <span className="bg-[#2a2a2a] px-3 py-1 rounded-md text-sm">
                {movie.languages.join(", ")}
              </span>
            </div>

            {/* Meta Info */}
            <p className="text-gray-300 text-sm mb-6">
              {movie.duration} • {movie.genre.join(", ")} •{" "}
              {movie.certification} • {movie.releaseDate}
            </p>

            {/* About */}
            <div>
              <h2 className="text-2xl font-semibold mb-3">
                About the movie
              </h2>

              <p className="text-gray-200 leading-7 text-sm">
                {movie.description}
              </p>
            </div>
          </div>

          {/* Share Button */}
          <div className="absolute top-5 right-5">
            <button
              className="bg-[#2a2a2a] px-4 py-2 rounded-lg
              flex items-center gap-2 text-sm hover:bg-[#444]
              transition cursor-pointer"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M18 16.08c-.76 0-1.44.3-1.96.77l-7.13-4.21c.05-.25.09-.51.09-.78s-.03-.53-.09-.78l7.04-4.15c.54.5 1.25.81 2.05.81 1.66 0 3-1.34 3-3S19.66 2 18 2s-3 1.34-3 3c0 .27.04.52.09.78L7.91 9.93C7.38 9.43 6.67 9.12 5.87 9.12 4.21 9.12 2.87 10.46 2.87 12.12s1.34 3 3 3c.8 0 1.51-.31 2.04-.81l7.13 4.21c-.06.24-.1.49-.1.75 0 1.66 1.34 3 3 3s3-1.34 3-3-1.34-3-3-3z" />
              </svg>

              Share
            </button>
          </div>
        </div>
      </div>

      {/* Show Timings Section */}
      <div className="max-w-7xl mx-auto mt-8 px-4">
        
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 mb-4">
          {filters.map((filter, i) => (
            <button
              key={i}
              className="border border-gray-300 px-5 py-2 rounded-lg
              text-sm hover:bg-gray-100 transition cursor-pointer"
            >
              {filter}
            </button>
          ))}
        </div>

        <hr className="border-gray-300 mb-4" />

        {/* Availability Status */}
        <div
          className="flex flex-wrap items-center gap-6 bg-gray-100
          px-6 py-3 rounded-lg text-sm mb-6"
        >
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-black rounded-full"></span>
            <small className="text-gray-600 font-medium">
              Available
            </small>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-yellow-400 rounded-full"></span>
            <small className="text-gray-600 font-medium">
              Filling Fast
            </small>
          </span>

          <span className="flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            <small className="text-gray-600 font-medium">
              Almost Full
            </small>
          </span>
        </div>

        {/* Theatre Timings */}
        <TheatreTimings movieId={movie.id} />
      </div>
    </>
  );
};

export default MovieDetails;