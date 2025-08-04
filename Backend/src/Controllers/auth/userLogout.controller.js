import { User } from "../../Models/User.schema.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const userLogout = wrapperAsync(async (req, res) => {
  const { id } = req.user;
  const user = await User.findByIdAndUpdate(
    id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  res
    .status(200)
    .clearCookie("accessToken", { httpOnly: true, secure: true })
    .clearCookie("refreshToken", { httpOnly: true, secure: true })
    .json({ success: true, status: 200, message: "Logged out" });
});
