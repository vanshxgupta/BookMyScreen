// File: src/modules/movie/movie.seed.ts

import mongoose from "mongoose";
import { MovieModel } from "../modules/movie/movie.model";
import { config } from "../config/config";

const movies = [
{
  title: "Avengers: Secret Wars",
  genre: ["Action", "Sci-Fi", "Adventure"],
  rating: 9.3,
  votes: 125000,
  languages: ["English", "Hindi", "Tamil", "Telugu"],
  certification: "UA13+",
  duration: "2h 50m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/or06FN3Dka5tukK1e9sl16pB3iy.jpg",
  releaseDate: new Date("2025-12-20"),
  description:
    "The Avengers assemble across universes to stop the collapse of reality itself.",
  format: ["2D", "3D", "IMAX 3D"],
},

{
  title: "Spider-Man: Beyond Dimensions",
  genre: ["Action", "Adventure", "Fantasy"],
  rating: 8.9,
  votes: 87300,
  languages: ["English", "Hindi"],
  certification: "UA13+",
  duration: "2h 14m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg",
  releaseDate: new Date("2025-11-11"),
  description:
    "Peter Parker gets trapped between dimensions where multiple Spider-Men fight for survival.",
  format: ["2D", "3D"],
},

{
  title: "The Batman: Arkham Shadow",
  genre: ["Action", "Crime", "Mystery"],
  rating: 8.8,
  votes: 74100,
  languages: ["English", "Hindi", "Tamil"],
  certification: "UA16+",
  duration: "2h 36m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/74xTEgt7R36Fpooo50r9T25onhq.jpg",
  releaseDate: new Date("2025-10-05"),
  description:
    "Batman investigates a terrifying series of crimes linked to Arkham Asylum.",
  format: ["2D", "IMAX"],
},

{
  title: "Fast X: Final Lap",
  genre: ["Action", "Thriller"],
  rating: 7.9,
  votes: 53200,
  languages: ["English", "Hindi", "Tamil", "Telugu"],
  certification: "UA13+",
  duration: "2h 8m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
  releaseDate: new Date("2025-09-21"),
  description:
    "Dom and his crew return for one last high-speed mission across continents.",
  format: ["2D", "4DX", "IMAX"],
},

{
  title: "Interstellar: Reborn",
  genre: ["Sci-Fi", "Drama"],
  rating: 9.1,
  votes: 96300,
  languages: ["English", "Hindi"],
  certification: "UA13+",
  duration: "2h 45m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg",
  releaseDate: new Date("2025-12-02"),
  description:
    "A new mission beyond the galaxy begins as Earth faces extinction once again.",
  format: ["2D", "IMAX 3D"],
},

{
  title: "Deadpool & Wolverine",
  genre: ["Action", "Comedy", "Sci-Fi"],
  rating: 8.6,
  votes: 115000,
  languages: ["English", "Hindi"],
  certification: "A",
  duration: "2h 7m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
  releaseDate: new Date("2025-08-08"),
  description:
    "Deadpool teams up with Wolverine in a chaotic multiverse adventure full of action and humor.",
  format: ["2D", "IMAX"],
},

{
  title: "Dune: Messiah",
  genre: ["Sci-Fi", "Adventure", "Drama"],
  rating: 9.0,
  votes: 68700,
  languages: ["English", "Hindi"],
  certification: "UA13+",
  duration: "2h 41m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/d5NXSklXo0qyIYkgV94XAgMIckC.jpg",
  releaseDate: new Date("2025-11-30"),
  description:
    "Paul Atreides struggles with destiny, power, and betrayal across Arrakis.",
  format: ["2D", "IMAX 3D"],
},

{
  title: "Joker: Madness Rising",
  genre: ["Crime", "Drama", "Thriller"],
  rating: 8.5,
  votes: 59200,
  languages: ["English", "Hindi"],
  certification: "A",
  duration: "2h 3m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
  releaseDate: new Date("2025-10-18"),
  description:
    "Gotham descends deeper into chaos as Arthur Fleck embraces his dark legacy.",
},

{
  title: "Transformers: Rise of Unicron",
  genre: ["Action", "Sci-Fi"],
  rating: 8.2,
  votes: 48300,
  languages: ["English", "Hindi", "Tamil"],
  certification: "UA13+",
  duration: "2h 20m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
  releaseDate: new Date("2025-09-09"),
  description:
    "Optimus Prime and the Autobots face their greatest enemy — Unicron.",
  format: ["2D", "3D", "IMAX"],
},

{
  title: "The Conjuring: Last Ritual",
  genre: ["Horror", "Mystery", "Thriller"],
  rating: 8.0,
  votes: 27600,
  languages: ["English", "Hindi"],
  certification: "A",
  duration: "1h 59m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/wDwQ2lMpcgXgmtt83z8uI02QhAq.jpg",
  releaseDate: new Date("2025-10-31"),
  description:
    "Ed and Lorraine Warren investigate their most terrifying paranormal case yet.",
  format: ["2D"],
},
{
  title: "War 2",
  genre: ["Action", "Thriller", "Spy"],
  rating: 8.8,
  votes: 75400,
  languages: ["Hindi", "Tamil", "Telugu"],
  certification: "UA13+",
  duration: "2h 34m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg",
  releaseDate: new Date("2025-08-14"),
  description:
    "Kabir returns for his deadliest undercover mission against a powerful global syndicate.",
  format: ["2D", "IMAX"],
},

{
  title: "Brahmastra: Part Two - Dev",
  genre: ["Fantasy", "Adventure", "Action"],
  rating: 8.6,
  votes: 68300,
  languages: ["Hindi", "Tamil", "Telugu"],
  certification: "UA13+",
  duration: "2h 42m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/zfE0R94v1E8cuKAerbskfD3VfUt.jpg",
  releaseDate: new Date("2025-12-25"),
  description:
    "The origin story of Dev unfolds as ancient astras threaten the balance of the universe.",
  format: ["2D", "3D", "IMAX 3D"],
},

{
  title: "Don 3",
  genre: ["Action", "Crime", "Thriller"],
  rating: 8.4,
  votes: 59200,
  languages: ["Hindi"],
  certification: "UA16+",
  duration: "2h 20m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg",
  releaseDate: new Date("2025-11-07"),
  description:
    "A new era begins as Don expands his criminal empire across Europe and Asia.",
  format: ["2D", "IMAX"],
},

{
  title: "Shaktimaan",
  genre: ["Superhero", "Action", "Fantasy"],
  rating: 8.9,
  votes: 82100,
  languages: ["Hindi", "Tamil", "Telugu"],
  certification: "UA",
  duration: "2h 28m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
  releaseDate: new Date("2025-10-02"),
  description:
    "India’s legendary superhero returns to fight a dark force threatening humanity.",
  format: ["2D", "3D", "IMAX 3D"],
},

{
  title: "Stree 3",
  genre: ["Horror", "Comedy"],
  rating: 8.3,
  votes: 44800,
  languages: ["Hindi"],
  certification: "UA16+",
  duration: "2h 5m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/9fPYKXUNf2Zd7bgw4jM7c2xL6b8.jpg",
  releaseDate: new Date("2025-09-19"),
  description:
    "The haunted town faces a terrifying new supernatural mystery after Stree returns.",
  format: ["2D"],
},

{
  title: "Animal Park",
  genre: ["Crime", "Action", "Drama"],
  rating: 9.1,
  votes: 97600,
  languages: ["Hindi", "Telugu"],
  certification: "A",
  duration: "2h 46m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/t5zCBSB5xMDKcDqe91qahCOUYVV.jpg",
  releaseDate: new Date("2025-12-05"),
  description:
    "Violence, revenge, and power collide as the deadly world of Animal expands.",
  format: ["2D", "IMAX"],
},

{
  title: "Krrish 4",
  genre: ["Sci-Fi", "Action", "Superhero"],
  rating: 8.7,
  votes: 88400,
  languages: ["Hindi", "Tamil", "Telugu"],
  certification: "UA13+",
  duration: "2h 30m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
  releaseDate: new Date("2025-11-21"),
  description:
    "Krrish faces a powerful time-traveling enemy determined to rewrite history.",
  format: ["2D", "3D", "IMAX 3D"],
},

{
  title: "Chandu Champion",
  genre: ["Sports", "Drama", "Biography"],
  rating: 8.5,
  votes: 31800,
  languages: ["Hindi"],
  certification: "UA",
  duration: "2h 16m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/e7zW9J6v6040H0x84mH6dM8JJ7p.jpg",
  releaseDate: new Date("2025-07-18"),
  description:
    "An inspiring story of determination and resilience against impossible odds.",
  format: ["2D"],
},

{
  title: "Housefull 5",
  genre: ["Comedy", "Drama"],
  rating: 7.4,
  votes: 21400,
  languages: ["Hindi"],
  certification: "UA",
  duration: "2h 11m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/5YZbUmjbMa3ClvSW1Wj3D6XGolb.jpg",
  releaseDate: new Date("2025-06-06"),
  description:
    "Chaos erupts once again as multiple families get tangled in hilarious misunderstandings.",
  format: ["2D"],
},

{
  title: "Ramayana",
  genre: ["Mythological", "Drama", "Adventure"],
  rating: 9.4,
  votes: 132000,
  languages: ["Hindi", "Tamil", "Telugu", "Malayalam"],
  certification: "UA13+",
  duration: "3h 2m",
  posterUrl:
    "https://image.tmdb.org/t/p/w500/4Kmz8Ew6SP9X4e3VGPf0s4M1dQk.jpg",
  releaseDate: new Date("2025-10-24"),
  description:
    "A grand cinematic retelling of Lord Rama’s legendary journey and the battle against Ravana.",
  format: ["2D", "3D", "IMAX 3D"],
},
];

const seedMovies = async () => {
  try {
    await mongoose.connect(config.databaseUrl as string);
    console.log("Connected to DB");

    await MovieModel.deleteMany(); // delete old movies
    await MovieModel.insertMany(movies); // insert new movies

    console.log("Movies seeded successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error seeding movies:", err);
    process.exit(1);
  }
};

seedMovies();
