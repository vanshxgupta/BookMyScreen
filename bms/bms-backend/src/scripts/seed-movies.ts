import mongoose from "mongoose";
import { MovieModel } from "../modules/movie/movie.model";
import { config } from "../config/config";

const movies = [
  // ─── Hollywood ───────────────────────────────────────────────────────────────
  {
    title: "Deadpool & Wolverine",
    genre: ["Action", "Comedy", "Sci-Fi"],
    rating: 7.8,
    votes: 512000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "A",
    duration: "2h 8m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
    releaseDate: new Date("2024-07-26"),
    description:
      "A listless Wade Wilson suits up again with a reluctant Wolverine when his homeworld faces an existential threat — unleashing multiverse mayhem and maximum fourth-wall destruction.",
    format: ["2D", "IMAX", "4DX"],
  },

  {
    title: "Dune: Part Two",
    genre: ["Sci-Fi", "Adventure", "Drama"],
    rating: 8.5,
    votes: 694000,
    languages: ["English", "Hindi"],
    certification: "UA13+",
    duration: "2h 46m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
    releaseDate: new Date("2024-03-01"),
    description:
      "Paul Atreides unites with the Fremen and embarks on a path of revenge against the conspirators who destroyed his family, while facing a terrible future only he can foresee.",
    format: ["2D", "IMAX 3D", "4DX"],
  },

  {
    title: "Inside Out 2",
    genre: ["Animation", "Comedy", "Drama"],
    rating: 7.8,
    votes: 418000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "U",
    duration: "1h 40m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
    releaseDate: new Date("2024-06-14"),
    description:
      "Riley's mind headquarters is turned upside-down when a brand-new emotion, Anxiety, shows up alongside Joy, Sadness, Anger, Fear, and Disgust.",
    format: ["2D", "3D", "IMAX 3D"],
  },

  {
    title: "Oppenheimer",
    genre: ["Biography", "Drama", "History"],
    rating: 8.3,
    votes: 1020000,
    languages: ["English", "Hindi"],
    certification: "UA16+",
    duration: "3h 0m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg",
    releaseDate: new Date("2023-07-21"),
    description:
      "The story of J. Robert Oppenheimer's role in the development of the atomic bomb during World War II — and the haunting moral reckoning that followed.",
    format: ["2D", "IMAX"],
  },

  {
    title: "Alien: Romulus",
    genre: ["Sci-Fi", "Horror", "Thriller"],
    rating: 7.2,
    votes: 320000,
    languages: ["English", "Hindi"],
    certification: "A",
    duration: "1h 59m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/b33nnKl1GSFbao4l3fZDDqsMx0F.jpg",
    releaseDate: new Date("2024-08-16"),
    description:
      "A group of young space colonizers come face to face with the most terrifying life form in the universe while scavenging an abandoned space station.",
    format: ["2D", "IMAX", "3D"],
  },

  {
    title: "Wicked",
    genre: ["Musical", "Fantasy", "Drama"],
    rating: 7.8,
    votes: 271000,
    languages: ["English", "Hindi"],
    certification: "UA",
    duration: "2h 40m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/xDGbZ0JJ3mYaGKy4Nzd9Kph6krn.jpg",
    releaseDate: new Date("2024-11-22"),
    description:
      "Before Dorothy's arrival in Oz, the untold story of the extraordinary friendship between the future Good Witch and the Wicked Witch of the West is revealed.",
    format: ["2D", "IMAX", "4DX"],
  },

  {
    title: "Joker: Folie à Deux",
    genre: ["Crime", "Drama", "Musical"],
    rating: 5.7,
    votes: 374000,
    languages: ["English", "Hindi"],
    certification: "A",
    duration: "2h 18m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/udDclJoHjfjb8Ekgsd4FDteOkCU.jpg",
    releaseDate: new Date("2024-10-04"),
    description:
      "Awaiting trial in Arkham State Hospital, Arthur Fleck encounters the love of his life, Lee Quinzel, and finds the music that's always been inside him.",
    format: ["2D", "IMAX"],
  },

  {
    title: "Moana 2",
    genre: ["Animation", "Adventure", "Family"],
    rating: 6.9,
    votes: 225000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "U",
    duration: "1h 40m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/aLVkiINlIeCkcZIzb7XHzPYgO6L.jpg",
    releaseDate: new Date("2024-11-27"),
    description:
      "Moana sets sail on a daring mission to the far seas of Oceania after receiving an unexpected call from her wayfinding ancestors.",
    format: ["2D", "3D", "IMAX 3D"],
  },

  {
    title: "Gladiator II",
    genre: ["Action", "Adventure", "Drama"],
    rating: 7.1,
    votes: 412000,
    languages: ["English", "Hindi"],
    certification: "UA16+",
    duration: "2h 28m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/2cxhvwyEwRlysAmRH4iodkvo0z5.jpg",
    releaseDate: new Date("2024-11-15"),
    description:
      "After his home is conquered by tyrants ruling Rome, Lucius is forced to enter the Colosseum, seeking a path to power and reclaiming the glory of Rome.",
    format: ["2D", "IMAX", "4DX"],
  },

  {
    title: "Venom: The Last Dance",
    genre: ["Action", "Sci-Fi", "Superhero"],
    rating: 6.3,
    votes: 284000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "UA13+",
    duration: "1h 49m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/aosm8NMQ3UyoBVpSxyimorCQykC.jpg",
    releaseDate: new Date("2024-10-25"),
    description:
      "Eddie Brock and Venom are on the run and forced into a devastating decision that could bring about the end of them both.",
    format: ["2D", "3D", "IMAX"],
  },

  // ─── Bollywood / Indian ───────────────────────────────────────────────────────
  {
    title: "Kalki 2898 AD",
    genre: ["Sci-Fi", "Action", "Mythology"],
    rating: 7.7,
    votes: 89400,
    languages: ["Telugu", "Hindi", "Tamil", "Malayalam"],
    certification: "UA13+",
    duration: "3h 1m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/3GrErTQhMh8OPOc0fWKMiUFzPOb.jpg",
    releaseDate: new Date("2024-06-27"),
    description:
      "Set in a futuristic dystopia intertwined with Hindu mythology, a reluctant warrior must rise as the prophesied savior Kalki to rescue a pregnant woman who carries the key to humanity's survival.",
    format: ["2D", "3D", "IMAX 3D"],
  },

  {
    title: "Pushpa 2: The Rule",
    genre: ["Action", "Crime", "Thriller"],
    rating: 8.0,
    votes: 142000,
    languages: ["Telugu", "Hindi", "Tamil", "Malayalam"],
    certification: "UA13+",
    duration: "3h 20m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/tqGnBuxlFlxULGFwHiCmP5PfGQd.jpg",
    releaseDate: new Date("2024-12-05"),
    description:
      "Pushpa Raj expands his red sandalwood smuggling empire but faces a relentless crackdown by SP Bhanwar Singh Shekawat, escalating into a deadly power struggle.",
    format: ["2D", "IMAX", "4DX"],
  },

  {
    title: "Stree 2",
    genre: ["Horror", "Comedy"],
    rating: 8.5,
    votes: 104000,
    languages: ["Hindi"],
    certification: "UA",
    duration: "2h 12m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/r5WGMROmSzAQDYiDl7yPFw3MGVK.jpg",
    releaseDate: new Date("2024-08-15"),
    description:
      "The town of Chanderi faces a terrifying new supernatural threat — a headless demon abducting men — and must confront the mysterious Stree once again to survive.",
    format: ["2D"],
  },

  {
    title: "Singham Again",
    genre: ["Action", "Crime", "Drama"],
    rating: 6.8,
    votes: 67200,
    languages: ["Hindi", "Tamil", "Telugu"],
    certification: "UA13+",
    duration: "2h 50m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/dZCTHRo47jMOFN0Y8kvpJQKzuAD.jpg",
    releaseDate: new Date("2024-11-01"),
    description:
      "Bajirao Singham leads an elite squad of police officers on a mission to rescue his kidnapped wife, invoking the spirit of the Ramayana in a battle against evil.",
    format: ["2D", "IMAX"],
  },

  {
    title: "Devara: Part 1",
    genre: ["Action", "Drama", "Thriller"],
    rating: 7.2,
    votes: 78300,
    languages: ["Telugu", "Hindi", "Tamil"],
    certification: "UA13+",
    duration: "2h 56m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/jQbFCNzHVCUcniR4Gf5KuCEF9kM.jpg",
    releaseDate: new Date("2024-09-27"),
    description:
      "A feared coastal lord and his cowardly son must both confront a fearsome mafia syndicate across two timelines — each facing the same enemy in radically different ways.",
    format: ["2D", "3D", "IMAX"],
  },

  {
    title: "The Greatest of All Time",
    genre: ["Action", "Sci-Fi", "Thriller"],
    rating: 7.6,
    votes: 55800,
    languages: ["Tamil", "Telugu", "Hindi"],
    certification: "UA13+",
    duration: "2h 48m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/7fntkHbMHDaLzfSXn8NNz78cKRg.jpg",
    releaseDate: new Date("2024-09-05"),
    description:
      "An intelligence operative who faked his death to protect his family must resurface when a ghost from his past targets his twin sons — and the weapon he created threatens the world.",
    format: ["2D", "IMAX"],
  },

  {
    title: "Bhool Bhulaiyaa 3",
    genre: ["Horror", "Comedy", "Mystery"],
    rating: 7.1,
    votes: 48900,
    languages: ["Hindi"],
    certification: "UA",
    duration: "2h 22m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/dqeMkSiVj9Gl8QFxfuUWfSftnMn.jpg",
    releaseDate: new Date("2024-11-01"),
    description:
      "Rooh Baba returns to battle a new supernatural entity possessing a young woman, teaming up with a rival exorcist in a battle of wits, spirits, and slapstick chaos.",
    format: ["2D"],
  },

  {
    title: "Mufasa: The Lion King",
    genre: ["Animation", "Adventure", "Family"],
    rating: 7.2,
    votes: 214000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "U",
    duration: "1h 58m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/lurEK87kukWNaHd0zYnsi3yzJrs.jpg",
    releaseDate: new Date("2024-12-20"),
    description:
      "Rafiki narrates the story of Mufasa's unlikely rise from a lost cub to the legendary King of the Pride Lands — and the bond he forged with a treacherous brother.",
    format: ["2D", "3D", "IMAX 3D"],
  },

  {
    title: "Twisters",
    genre: ["Action", "Adventure", "Thriller"],
    rating: 7.2,
    votes: 298000,
    languages: ["English", "Hindi"],
    certification: "UA13+",
    duration: "2h 2m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/pjnD08FlMAIXsfOLKQbvmO0f0MD.jpg",
    releaseDate: new Date("2024-07-19"),
    description:
      "A storm researcher traumatised by a deadly encounter returns to Oklahoma to face the most extreme tornado season on record alongside a daring social media storm-chaser.",
    format: ["2D", "IMAX", "4DX"],
  },

  {
    title: "Kung Fu Panda 4",
    genre: ["Animation", "Action", "Comedy"],
    rating: 7.2,
    votes: 276000,
    languages: ["English", "Hindi", "Tamil", "Telugu"],
    certification: "U",
    duration: "1h 34m",
    posterUrl:
      "https://image.tmdb.org/t/p/w500/kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg",
    releaseDate: new Date("2024-03-08"),
    description:
      "Po must train a new Dragon Warrior while facing a shapeshifting sorceress who can take the form of villains from his past — and question everything he stands for.",
    format: ["2D", "3D", "IMAX 3D"],
  },
];

const seedMovies = async () => {
  try {
    await mongoose.connect(config.databaseReplicaSet as string);
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