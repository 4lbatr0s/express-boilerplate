import CryptoJS from "crypto-js";
import JWT from "jsonwebtoken";
import * as uuid from "uuid";

//TODO: SINGLE RESPONSIIBILITY PRINCIPLE IS VIOLATED.
class Helper{
    constructor(){}
    /**
     * 
     * @param {String} password password we want to hash 
     * @returns 
     */
    passwordToHash(password){
        const firstHash = CryptoJS.HmacSHA1(password, process.env.PASSWORD_HASH).toString();
        const secondHash = CryptoJS.HmacSHA256(password, firstHash).toString();
        return secondHash;
    }
    createAccessToken(user){//TIP: we should specify name for jwt.sign, otherwise throws error.
        const {password, ...others} = user._doc;
        return JWT.sign({name:user.full_name, ...others}, process.env.ACCESS_TOKEN_SECRET_KEY, {expiresIn:"1w"});
    }
    createRefreshToken(user){
        const {password, ...others} = user._doc;
        return JWT.sign({name:user.full_name, ...others}, process.env.REFRESH_TOKEN_SECRET_KEY);
    }
    createPassword(){
        return uuid.v4().split("-")[0] || `usr-${new Date().getTime()}`;
    }
}

export default new Helper();