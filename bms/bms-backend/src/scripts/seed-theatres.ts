import mongoose from "mongoose";
import dotenv from "dotenv";
import { TheatreModel } from "../modules/theatre/theatre.model";
import { config } from "../config/config";

dotenv.config();

mongoose
  .connect(config.databaseReplicaSet as string)
  .then(async () => {
    console.log("Connected to MongoDB ");

    const cities = [
      {
        name: "Mumbai",
        state: "Maharashtra",
        areas: [
          "Andheri",
          "Bandra",
          "Powai",
          "Borivali",
          "Juhu",
          "Lower Parel",
        ],
      },

      {
        name: "Delhi",
        state: "Delhi",
        areas: [
          "Connaught Place",
          "Saket",
          "Dwarka",
          "Karol Bagh",
          "Rohini",
          "Janakpuri",
        ],
      },

      {
        name: "Bangalore",
        state: "Karnataka",
        areas: [
          "Whitefield",
          "Koramangala",
          "Indiranagar",
          "Marathahalli",
          "Electronic City",
          "HSR Layout",
        ],
      },

      {
        name: "Hyderabad",
        state: "Telangana",
        areas: [
          "Banjara Hills",
          "Gachibowli",
          "Madhapur",
          "Ameerpet",
          "Kukatpally",
          "Begumpet",
        ],
      },

      {
        name: "Kolkata",
        state: "West Bengal",
        areas: [
          "Salt Lake",
          "New Town",
          "Park Street",
          "Gariahat",
          "Howrah",
          "Dum Dum",
        ],
      },

      {
        name: "Chennai",
        state: "Tamil Nadu",
        areas: [
          "T Nagar",
          "Velachery",
          "Adyar",
          "Anna Nagar",
          "OMR",
          "Guindy",
        ],
      },

      {
        name: "Ahmedabad",
        state: "Gujarat",
        areas: [
          "Navrangpura",
          "Maninagar",
          "Thaltej",
          "Vastrapur",
          "SG Highway",
          "Bopal",
        ],
      },

      {
        name: "Pune",
        state: "Maharashtra",
        areas: [
          "Hinjewadi",
          "Kothrud",
          "Viman Nagar",
          "Baner",
          "Wakad",
          "Magarpatta",
        ],
      },

      {
        name: "Jaipur",
        state: "Rajasthan",
        areas: [
          "Malviya Nagar",
          "Vaishali Nagar",
          "C Scheme",
          "Mansarovar",
          "Jagatpura",
          "MI Road",
        ],
      },

      {
        name: "Lucknow",
        state: "Uttar Pradesh",
        areas: [
          "Hazratganj",
          "Gomti Nagar",
          "Alambagh",
          "Indira Nagar",
          "Aliganj",
          "Charbagh",
        ],
      },

      {
        name: "Chandigarh",
        state: "Chandigarh",
        areas: [
          "Sector 17",
          "Sector 35",
          "Sector 22",
          "Manimajra",
          "Zirakpur",
          "Mohali",
        ],
      },

      {
        name: "Indore",
        state: "Madhya Pradesh",
        areas: [
          "Treasure Island Mall",
          "C21 Mall",
          "Malhar Mega Mall",
          "Phoenix Citadel",
          "Vijay Nagar",
          "Rajwada",
          "Palasia",
          "MG Road",
          "Sapna Sangeeta",
          "Rau",
        ],
      },

      {
        name: "Bhopal",
        state: "Madhya Pradesh",
        areas: [
          "DB Mall",
          "Aura Mall",
          "Aashima Mall",
          "C21 Mall",
          "People's Mall",
          "MP Nagar",
          "New Market",
          "Arera Colony",
          "Kolar Road",
          "TT Nagar",
          "Habibganj",
          "Bittan Market",
        ],
      },

      {
        name: "Nagpur",
        state: "Maharashtra",
        areas: [
          "Sitabuldi",
          "Dharampeth",
          "Wardha Road",
          "Ambazari",
          "Manish Nagar",
          "Sadar",
        ],
      },

      {
        name: "Patna",
        state: "Bihar",
        areas: [
          "Boring Road",
          "Kankarbagh",
          "Patliputra",
          "Bailey Road",
          "Danapur",
          "Fraser Road",
        ],
      },

      {
        name: "Ranchi",
        state: "Jharkhand",
        areas: [
          "Lalpur",
          "Harmu",
          "Morabadi",
          "Kokar",
          "Main Road",
          "Doranda",
        ],
      },

      {
        name: "Surat",
        state: "Gujarat",
        areas: [
          "Adajan",
          "Piplod",
          "Vesu",
          "Varachha",
          "Athwa",
          "Udhna",
        ],
      },

      {
        name: "Noida",
        state: "Uttar Pradesh",
        areas: [
          "Sector 18",
          "Sector 62",
          "Sector 137",
          "Sector 50",
          "Greater Noida",
          "Film City",
        ],
      },

      {
        name: "Guwahati",
        state: "Assam",
        areas: [
          "Paltan Bazar",
          "Silpukhuri",
          "Ganeshguri",
          "Dispur",
          "Zoo Road",
          "Beltola",
        ],
      },

      {
        name: "Vizag",
        state: "Andhra Pradesh",
        areas: [
          "MVP Colony",
          "Gajuwaka",
          "Dwaraka Nagar",
          "Waltair Uplands",
          "RK Beach",
          "Maddilapalem",
        ],
      },
    ];

    const brands = ["PVR", "INOX", "Cinepolis"];
    
    // Permanent, open-source image links
    const logos: Record<string, string> = {
      PVR: "https://en.wikipedia.org/wiki/Special:FilePath/Pvrcinemas_logo.jpg",
      INOX:"https://res.cloudinary.com/vanshaurcode/image/upload/v1779195199/7f232db28d63e1365b8aa810b8fe5fd4_z5zv5z.jpg",
      Cinepolis: "https://en.wikipedia.org/wiki/Special:FilePath/Cinépolis.svg",
      Miraj:"https://res.cloudinary.com/vanshaurcode/image/upload/v1779195198/miraj-logo_jlfocv.jpg"
    };

    const theatres = [];

    for (const city of cities) {

      // Randomly generate 3 to 6 theatres
      const numTheatres = Math.floor(Math.random() * 4) + 3;

      for (let i = 0; i < numTheatres; i++) {
        const brand = brands[i % brands.length];
        const area = city.areas[i % city.areas.length];

        theatres.push({
          name: `${brand} ${area}`,
          location: `${area}, ${city.name}`,
          city: city.name,
          state: city.state,
          logo: logos[brand],
         });
      }
    }

    await TheatreModel.deleteMany({});
    await TheatreModel.insertMany(theatres);

    console.log(`✅ Seeded ${theatres.length} theatres successfully.`);
    process.exit(0);
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed:", err);
    process.exit(1);
});