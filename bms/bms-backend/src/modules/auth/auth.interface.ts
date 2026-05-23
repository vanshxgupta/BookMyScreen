import mongoose from "mongoose";

export interface IOtpPayload {
    email: string;
    code: string;
};

export interface IRefreshTokenPayload {
   token: string;
   userId: mongoose.Types.ObjectId;
   createdAt: Date;
};

export interface ITokenPayload { //access token payload
    _id : string | undefined;
    email? : string;
    phone? : string;
    role? : string;
}