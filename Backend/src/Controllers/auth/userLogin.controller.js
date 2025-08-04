import { User } from "../../Models/User.schema.js";
import { accessAndRefreshTokenGenerator } from "../../utils/accessAndRefreshTokenGenerator.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const userLogin = wrapperAsync(async (req, res) => {
  const { username, emailId, password } = req.validatedUser;

  const user = await User.findOne({ $or: [{ username }, { emailId }] });

  if (!user) {
    return res.status(404).json({
      success: false,
      status: 404,
      message: "User not found try registering yourself",
    });
  }

  const isValidPassword = await user.validatePassword(password);

  if (!isValidPassword) {
    return res
      .status(401)
      .json({ success: false, status: 404, message: "Invaild credentials" });
  }

  const { accessToken, refreshToken } = await accessAndRefreshTokenGenerator(
    user._id
  );

  res
    .status(200)
    .cookie("accessToken", accessToken, { httpOnly: true, secure: true })
    .cookie("refreshToken", refreshToken, { httpOnly: true, secure: true })
    .json({ success: true, status: 200, message: "Logged in sucessfully" });
});
