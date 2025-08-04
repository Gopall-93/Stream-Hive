import { User } from "../../Models/User.schema.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const updateUserPassword = wrapperAsync(async (req, res) => {
  const { _id } = req.user;
  const { currentPassword, newPassword, confirmPassword } = req.body;

  const user = await User.findById(_id);
  if (!user) {
    throw new CustomError(404, "User not found");
  }

  const isPasswordCorrect = await user.validatePassword(currentPassword);
  if (!isPasswordCorrect) {
    throw new CustomError(401, "Current password is incorrect");
  }

  const isSameAsOld = await user.validatePassword(newPassword);
  if (isSameAsOld) {
    throw new CustomError(
      409,
      "New password must be different from the previous password"
    );
  }

  if (newPassword !== confirmPassword) {
    throw new CustomError(400, "New password and confirm password must match");
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password updated successfully",
  });
});
