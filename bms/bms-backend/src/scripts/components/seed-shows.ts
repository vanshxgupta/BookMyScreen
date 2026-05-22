// Iska kaam:
// shows create karna

// Isme:
// DB connect nahi hota
// deleteMany nahi hota
// auto run nahi hota

// Bas reusable functions hain.

import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

import { MovieModel } from "../../modules/movie/movie.model";
import { TheatreModel } from "../../modules/theatre/theatre.model";
import { ShowModel } from "../../modules/show/show.model";

import { generateSeatLayout } from "../../utils/index";

// Extend dayjs
dayjs.extend(customParseFormat);

const generatePriceMap = () =>
  new Map([
    ["PREMIUM", 510],
    ["EXECUTIVE", 290],
    ["NORMAL", 270],
  ]);

const formats = [
  "2D",
  "3D",
  "IMAX",
  "PVR PXL",
];

const fixedTimeSlots = [
  {
    start: "09:00 AM",
    end: "11:30 AM",
  },

  {
    start: "12:30 PM",
    end: "03:00 PM",
  },

  {
    start: "04:00 PM",
    end: "06:30 PM",
  },

  {
    start: "07:30 PM",
    end: "10:00 PM",
  },

  {
    start: "10:30 PM",
    end: "01:00 AM",
  },
];


// SIRF EK DATE
// ke shows create karta hai
export const seedShowForDate = async (
  showDate: dayjs.Dayjs
) => {

  const movies =
    await MovieModel.find({});

  const theatres =
    await TheatreModel.find({});

  const formattedDate =
    showDate.format("DD-MM-YYYY");

  for (const movie of movies) {

    for (const theatre of theatres) {

      const numShows =
        Math.floor(Math.random() * 3) + 2;

      const shuffledSlots =
        [...fixedTimeSlots]
          .sort(() => Math.random() - 0.5);

      const selectedSlots =
        shuffledSlots.slice(0, numShows);

      for (const slot of selectedSlots) {

        const existingShow =
          await ShowModel.findOne({
            movie: movie._id,
            theatre: theatre._id,
            date: formattedDate,
            startTime: slot.start
          });

        if (existingShow) {
          continue;
        }

        const newShow = new ShowModel({

          movie: movie._id,

          theatre: theatre._id,

          location: theatre.state,

          format:
            formats[
              Math.floor(
                Math.random() *
                formats.length
              )
            ],

          audioType: "Dolby 7.1",

          startTime: slot.start,

          date: formattedDate,

          priceMap:
            generatePriceMap(),

          seatLayout:
            generateSeatLayout(),
        });

        await newShow.save();
      }
    }
  }

  console.log(
    `Shows seeded for ${formattedDate}`
  );
};


// Ye:
// next 7 days
// seed karta hai.
export const seedShow = async () => {

  const today =
    dayjs().startOf("day");

  for (let d = 0; d < 7; d++) {

    const showDate =
      today.add(d, "day");

    await seedShowForDate(
      showDate
    );
  }

  console.log(
    "Initial 7 days shows seeded"
  );
};