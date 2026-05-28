import mongoose, { Schema } from "mongoose";
import { IBooking } from "./booking.interface";

const bookingSchema = new mongoose.Schema<IBooking>(
  {
    bookingRef: {
      type: String,
      required: true,
      unique: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,  //to query fast
    },
    showId: {
      type: Schema.Types.ObjectId,
      ref: "Show",
      required: true,
      index: true,
    },
    seats: [
      {
        type: String,
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["CONFIRMED", "FAILED", "CANCELLED"],
      required: true,
      default: "CONFIRMED",
    },
    bookingDateTime: {
      type: Date,
      required: true,
      default: Date.now,
    },

    paymentId: {
      type: String,
      required: true,
    },

    paymentMethod: {
      type: String,
      required: true,
    },

    bookingFee: {
      ticketPrice: {
        type: Number,
        required: true,
      },
      total: {
        type: Number,
        required: true,
      },
      convenience: {
        type: Number,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

// This runs BEFORE saving document.
// Sorts seats alphabetically.
bookingSchema.pre("save", function (next) {
    this.seats.sort();
    next();
});

const BookingModel = mongoose.model<IBooking>("Booking", bookingSchema);
export default BookingModel;


// {
//   _id: ObjectId("..."),
//   bookingRef: "BK10291",
//   userId: ObjectId("..."),
//   showId: ObjectId("..."),
//   seats: ["A1", "A2"],
//   status: "CONFIRMED",
//   paymentId: "pay_QWERTY123",
//   paymentMethod: "UPI",
//   bookingFee: {
//     ticketPrice: 250,
//     convenience: 30,
//     total: 530
//   },
//   bookingDateTime: ISODate("2026-05-28T10:30:00Z"),
//   createdAt: ISODate(...),
//   updatedAt: ISODate(...)
// }