import mongoose from "mongoose";
import { wrapperAsync } from "../../utils/Error/wrapperAsync";
import { User } from "../../Models/User.schema";

export const getVideos = wrapperAsync(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistroy",
        pipeline: [
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
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);
  res
    .status(200)
    .json({
      success: true,
      staus: 200,
      watchHistory: user[0].watchHistory,
      message: "Watch Histroy fetched successfully",
    });
});
