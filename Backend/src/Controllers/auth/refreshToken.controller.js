import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import JWT from "jsonwebtoken";
import { User } from "../../Models/User.schema.js";
import { accessAndRefreshTokenGenerator } from "../../utils/accessAndRefreshTokenGenerator.js";

export const refreshToken = wrapperAsync(async (req, res) => {
  const oldRefreshToken = req.cookies.refreshToken;

  if (!oldRefreshToken) {
    throw new CustomError(401, "Unauthorized");
  }

  const { id } = JWT.verify(
    oldRefreshToken,
    process.env.REFRESH_TOKEN_SECRET_KEY
  );

  console.log(id);

  const user = await User.findById(id);

  if (!user) {
    throw new CustomError(401, "Invalid refresh token");
  }

  if (oldRefreshToken !== user?.refreshToken) {
    throw new CustomError(401, "Refresh token is expired or used");
  }

  const { accessToken, refreshToken } = await accessAndRefreshTokenGenerator(
    user?._id
  );


  res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json({
      success: true,
      status: 200,
      message: "Token refreshed successfully",
    });
});
