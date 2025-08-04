import { nanoid } from "nanoid";
import { cloudinaryUpload } from "../../utils/cloudinary.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import { Video } from "../../Models/video.schema.js";

export const uploadVideo = wrapperAsync(async (req, res) => {
  const { _id, username } = req.user;
  const {title,description} = req.body

  const videoLocalPath = req.files?.video[0]?.path;

  if (!videoLocalPath) {
    throw new CustomError(
      500,
      "Something went wrong while uploading the video"
    );
  }

  const thumbnailLocalPath = req.files?.thumbnail[0]?.path;

  if (!thumbnailLocalPath) {
    throw new CustomError(
      500,
      "Something went wrong while uploading the thumbnail"
    );
  }

  const thumbnailProps = await cloudinaryUpload(
    thumbnailLocalPath,
    `thumbnail${username}${nanoid(10)}`,
    username
  );

  const videoProps = await cloudinaryUpload(
    videoLocalPath,
    `video${username}${nanoid(10)}`,
    username
  );

  const video = await Video.create({
    videoFile: videoProps.secure_url,
    thumbnail: thumbnailProps.secure_url,
    title,
    description,
    duration: videoProps.duration,
    owner: _id,
    publicIdVideo: videoProps.public_id,
    publicIdThumbnail: thumbnailProps.public_id,
  });

  const createdVideo = await Video.findById(video._id)

  if(!createdVideo){
    throw new CustomError(500,"something went wrong while uploading or creating the video")
  }

  return res.status(201).json({
    status: 201,
    success: true,
    createdVideo,
    message: "User registered successfully",
  });
});
