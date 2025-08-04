import { User } from "../Models/User.schema.js";
import CustomError from "./Error/CustomErrorClass.js";

export const accessAndRefreshTokenGenerator = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    console.log(error)
    throw new CustomError(
      500,
      "Something went wrong while generating access token"
    );
  }
};
