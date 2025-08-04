import { User } from "../../Models/User.schema.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { cloudinaryUpload } from "../../utils/cloudinary.js";

export const userRegistration = wrapperAsync(async (req, res) => {
  const { name, username, password, phonenumber, emailId } = req.validatedUser;

  const exsitingUser = await User.findOne({
    $or: [{ emailId }, { phonenumber }, { username }],
  });

  if (exsitingUser) {
    throw new CustomError(409, "User already existed");
  }

  let avatarURL = undefined;
  const avatarLocalPath = req.files?.avatar[0]?.path;

  if (avatarLocalPath) {
    avatarURL = await cloudinaryUpload(
      avatarLocalPath,
      `avatar${username}`,
      username
    );
  }

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  const coverImageURL = await cloudinaryUpload(
    coverImageLocalPath,
    `coverImage${username}`,
    username
  );

  const user = await User.create({
    name,
    username,
    password,
    phonenumber,
    avatar: avatarURL.secure_url,
    coverImage: coverImageURL.secure_url,
    emailId,
  });

  const createdUser = await User.findById(user._id);

  if (!createdUser) {
    throw new CustomError(500, "Something went wrong while saving the User");
  }

  return res.status(201).json({
    status: 201,
    success: true,
    createdUser,
    message: "User registered successfully",
  });
});
