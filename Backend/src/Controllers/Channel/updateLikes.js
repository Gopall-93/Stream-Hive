import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import { Video } from "../../Models/video.schema.js";
import { Tweet } from "../../Models/tweet.schema.js";
import { Like } from "../../Models/like.schema.js";
import { Comment } from "../../Models/comments.schema.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";

const contentModels = {
  video: Video,
  tweet: Tweet,
  comment: Comment,
};

const likeFields = {
  video: "videoId",
  tweet: "tweetId",
  comment: "commentId",
};

export const updateLikes = wrapperAsync(async (req, res) => {
  const { _id } = req?.user;
  const { type } = req?.query;
  const { typeId } = req?.params;

  if ([_id, type, typeId].some((request) => request === undefined)) {
    throw new CustomError(409, "Conflict occured due to missing data");
  }

  if (!["video", "tweet", "comment"].includes(type)) {
    throw new CustomError(406, "Invalid content type");
  }

  const Model = contentModels[type];
  const field = likeFields[type];

  const content = await Model.findById(typeId);
  if (!content) {
    throw new CustomError(404, `${type} doesn't exist`);
  }

  const existingLike = await Like.findOne({ [field]: typeId, likedBy: _id });

  if (existingLike) {
    await existingLike.deleteOne();
    return res.status(200).json({
      status: 200,
      success: true,
      message: "Successfully unliked",
    });
  }

  console.log(field);

  const newLike = await Like.create({ [field]: typeId, likedBy: _id });

  return res.status(201).json({
    status: 201,
    success: true,
    newLike,
    message: "Successfully liked",
  });
});
