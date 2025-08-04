import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import JWT from "jsonwebtoken"
import {User} from "../../Models/User.schema.js"

export const verifyToken = wrapperAsync(async (req, res, next) => {
  const token =
    req.cookies?.accessToken ||
    req.header("authorizarion")?.replace("bearer ", "");

    if(!token){
        throw new CustomError(404,"Token not found")
    }

    const decodedUser = JWT.verify(token,process.env.ACCESS_TOKEN_SECRET_KEY)

    if(!decodedUser){
        throw new CustomError(401,"Unauthorised Invaild token")
    }

    const user = await User.findById(decodedUser.id)

    if(!user){
        throw new CustomError(401,"Unauthorised")
    }
    req.user = user
    next()
});
