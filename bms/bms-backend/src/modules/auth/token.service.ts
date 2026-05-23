import {ITokenPayload} from "./auth.interface";
import jwt, { JwtPayload } from "jsonwebtoken";
import {config} from "../../config/config";
import { RefreshTokenModel } from "./refresh.model";

export const generateToken=(payload:ITokenPayload):{ accessToken: string; refreshToken: string }=>{
    const accessToken=jwt.sign(payload,config.accessTokenSecret,{expiresIn:'1h'});
    const refreshToken=jwt.sign(payload,config.refreshTokenSecret,{expiresIn:'7d'});
    return {accessToken,refreshToken};
}


// Generation ke time par JWT internally:

// payload leta hai
// secret lagata hai
// signature banata hai


//verify ke time par backend:

// token ki signature nikalega
// same secret se dubara signature generate krega
// dono compare karega hai

// Agar:
// signatures same -> token valid
// signatures different -> invalid



//store refresh token in database
export const storeRefreshToken=async(refreshToken:string,userId:string):Promise<void>=>{
    try{
        await RefreshTokenModel.create({token:refreshToken,userId});
    }
    catch(error){
      throw error;
    }
}


//sync becuase jwt verification is already fast 

//verify access token
export const verifyAccessToken=(token:string):ITokenPayload | JwtPayload=>{
    try{
        return jwt.verify(token,config.accessTokenSecret) as ITokenPayload | JwtPayload;
    }
    catch(error){
        throw error;
    }
}


//verify refresh token
export const verifyRefreshToken=(token:string):ITokenPayload | JwtPayload=>{
    try{
        return jwt.verify(token,config.refreshTokenSecret) as ITokenPayload | JwtPayload;
    }
    catch(error){
        throw error;
    }
}


//to find refresh token in database -> to check session is still alive or not
export const findRefreshToken=async(userId:string,token:string): Promise<{userId:string,token:string} | null>=>{
    try{
        return await RefreshTokenModel.findOne({userId,token});
    }
    catch(error){
        throw error;
    }
}

export const deleteRefreshToken=async(token:string):Promise<void>=>{
    try{
        await RefreshTokenModel.findOneAndDelete({token});
    }
    catch(error){
        throw error;
    }
}

export const updateRefreshToken = async (userId: string, newToken: string): Promise<void> => {
    try {
        await RefreshTokenModel.updateOne(
            {userId},
            {token: newToken}, //update token with newtoken
            {upsert: true} // upsert means , if exist , update, else create a new document 
        );
    }catch (error) {
        throw error;
    }
}
