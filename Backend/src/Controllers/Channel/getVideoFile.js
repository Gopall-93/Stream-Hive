import { Video } from "../../Models/video.schema.js";
import { wrapperAsync } from "../../utils/Error/wrapperAsync.js";
import CustomError from "../../utils/Error/CustomErrorClass.js";
import mongoose from "mongoose";

export const getVideoFile = wrapperAsync(async (req, res) => {
  const id = req.params.id;
  const viewerId = req.params.viewerId;

  if (!id) {
    throw new CustomError(400, "Username is required");
  }

  const video = await Video.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(id),
      },
    },
    {
      $lookup: {
        from: "likes",
        localField: "_id",
        foreignField: "videoId",
        as: "likes",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "videoId",
        as: "comments",
        pipeline: [
          {
            $project: {
              content: 1,
              createdAt: 1,
              updatedAt: 1,
              owner: 1,
            },
          },
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    username: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $lookup: {
              from: "subscriptions",
              localField: "_id",
              foreignField: "channelOwner",
              as: "subscribers",
            },
          },
          {
            $addFields: {
              subscriberCount: {
                $size: "$subscribers",
              },
              isSubscribed: {
                $cond: {
                  if: {
                    $in: [
                      new mongoose.Types.ObjectId(viewerId),
                      "$subscribers.subscriber",
                    ],
                  },
                  then: true,
                  else: false,
                },
              },
            },
          },
          {
            $project: {
              avatar: 1,
              username: 1,
              subscriberCount: 1,
              isSubscribed: 1,
            },
          },
        ],
      },
    },
    {
      $addFields: {
        likes: {
          $size: "$likes",
        },
        isLiked: {
          $cond: {
            if: {
              $in: [new mongoose.Types.ObjectId(viewerId), "$likes.likedBy"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
  ]);

  if (!video?.length) {
    throw new CustomError(404, "Video not found");
  }

  res.status(200).json({
    success: true,
    status: 200,
    channel: video[0],
    message: "Video Found",
  });
});
