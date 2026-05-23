import mongoose from "mongoose";
import { IRefreshTokenPayload } from "./auth.interface";

const refreshTokenSchema = new mongoose.Schema({
    token: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

export const RefreshTokenModel = mongoose.model<IRefreshTokenPayload>('RefreshToken', refreshTokenSchema);