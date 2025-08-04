import { User } from "../../Models/User.schema.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";

export const updateUserProfile = wrapperAsync(async (req, res) => {
  const { _id } = req.user;
  const updatedUser = await User.findByIdAndUpdate(
    _id,
    { $set: req.body },
    { new: true }
  );
  
  res
    .status(200)
    .json({
      status: 200,
      success: true,
      updatedUserDetails: updatedUser,
      message: "Here's the updated user details",
    });
});
