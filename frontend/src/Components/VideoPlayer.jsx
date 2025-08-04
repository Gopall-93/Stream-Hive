import { useParams } from "@tanstack/react-router";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getVideoURLAPI } from "../../API/videoURLAPI";
import { axiosInstance } from "../lib/axiosInstance";
import { ThumbsUp } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { timeAgo } from "../../utils/timeAgo";

export const VideoPlayer = () => {
  const { videoId, viewerId } = useParams({ strict: false });
  const queryClient = useQueryClient();
  const [commentText, setCommentText] = useState("");

  const {
    data: videoData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["videoDetails", videoId],
    queryFn: () => getVideoURLAPI(videoId, viewerId),
  });

  const subscriptionMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.get(
        `/subscribe/${viewerId}/${videoData.owner[0]._id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoDetails", videoId] });
    },
  });

  const likeVideoMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(`/like/${videoId}?type=video`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["videoDetails", videoId] });
    },
  });

  const likeCommentMutation = useMutation({
    mutationFn: async ({commentId}) => {
      await axiosInstance.post(`/like/${commentId}?type=comment`, {
        withCredentials: true,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["commentDetails",videoId] });
    },
  });

  const commentMutation = useMutation({
    mutationFn: async () => {
      await axiosInstance.post(
        `/comments/${videoId}?type=video`,
        { content: commentText },
        { withCredentials: true }
      );
    },
    onSuccess: () => {
      setCommentText("");
      queryClient.invalidateQueries({ queryKey: ["videoDetails", videoId] });
    },
  });

  if (isLoading)
    return (
      <p className="text-center text-xl font-semibold mt-10">
        Loading video...
      </p>
    );

  if (isError)
    return (
      <p className="text-center text-red-500 font-semibold mt-10">
        Error loading video
      </p>
    );

  const { videoFile, thumbnail, title, owner, comments = [] } = videoData;

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Video Section */}
      <div className="w-full aspect-video overflow-hidden mb-6 sm:mb-10 sm:rounded-xl shadow-xl">
        <video
          className="w-full h-full object-cover"
          src={videoFile}
          poster={thumbnail}
          controls
          autoPlay
          muted
          playsInline
        />
      </div>

      {/* Video Details Section */}
      <div className="sm:px-6 px-3 max-w-6xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">{title}</h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          {/* Avatar + Channel Info */}
          <div className="flex gap-4 sm:gap-6 items-center">
            <div className="avatar">
              <div className="w-14 sm:w-20 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img src={owner[0]?.avatar} alt="Avatar" />
              </div>
            </div>
            <div className="flex flex-col">
              <div className="text-lg sm:text-xl font-semibold">
                {owner[0]?.username}
              </div>
              <div className="text-sm text-gray-500">
                {owner[0]?.subscriberCount ?? 0} subscribers
              </div>
            </div>
          </div>

          {/* Subscribe & Like Buttons */}
          <div className="flex flex-wrap gap-4 sm:gap-6 sm:ml-auto items-center">
            <motion.button
              onClick={() => subscriptionMutation.mutate()}
              whileTap={{ scale: 0.95 }}
              className={`btn btn-sm sm:btn-md rounded-full transition-all duration-300 ${
                owner[0]?.isSubscribed
                  ? "btn-outline btn-primary"
                  : "btn-primary"
              }`}
              disabled={subscriptionMutation.isPending}
            >
              {subscriptionMutation.isPending
                ? "Updating..."
                : owner[0]?.isSubscribed
                ? "Subscribed"
                : "Subscribe"}
            </motion.button>

            <motion.button
              onClick={() => likeVideoMutation.mutate()}
              whileTap={{ scale: 0.95 }}
              disabled={likeVideoMutation.isPending}
              className={`btn btn-sm sm:btn-md rounded-full transition-all duration-300 flex items-center gap-2 ${
                videoData?.isLiked
                  ? "btn-outline btn-secondary"
                  : "btn-secondary"
              }`}
            >
              <ThumbsUp className="w-4 h-4 text-white" />
              {likeVideoMutation.isPending
                ? "Updating..."
                : `${videoData?.likes ?? 0} Likes`}
            </motion.button>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-10 border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">
            {videoData?.comments?.length > 0
              ? `${videoData?.comments?.length} Comment`
              : `${videoData?.comments?.length} Comments`}{" "}
          </h2>

          {/* Comment Input */}
          <div className="flex items-center gap-3 mb-6">
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="input input-bordered w-full"
            />
            <button
              onClick={() => commentMutation.mutate()}
              className="btn btn-primary"
              disabled={commentMutation.isPending || commentText.trim() === ""}
            >
              {commentMutation.isPending ? "Posting..." : "Post"}
            </button>
          </div>

          {/* Render Comments */}
          {videoData?.comments?.map((comment) => (
            <div
              key={comment?._id}
              className="flex items-start gap-4 p-4 rounded-md bg-base-200"
            >
              {/* Avatar */}
              <div className="avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={comment?.owner?.[0]?.avatar || "/placeholder.jpg"}
                    alt="User Avatar"
                  />
                </div>
              </div>

              {/* Comment Content */}
              <div className="flex-1">
                {/* Username + Date */}
                <div className="flex flex-wrap items-center gap-2 text-sm">
                  <span className="font-semibold">
                    {comment?.owner?.[0]?.username || "User"}
                  </span>
                  <span className="text-gray-500 text-xs">
                    {timeAgo(comment?.createdAt)}
                  </span>
                </div>

                {/* Comment Body */}
                <div className="text-sm text-gray-700 mt-1">
                  {comment?.content}
                </div>

                {/* Like Button Row (Below content) */}
                <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => likeCommentMutation.mutate({commentId:comment._id})}
                    className={`btn btn-xs rounded-full bg-transparent flex items-center gap-1 ${
                      comment?.isLiked ? "btn-secondary" : ""
                    }`}
                  >
                    <ThumbsUp className="w-3 h-3" />
                    {comment?.likes ?? 0}
                  </motion.button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
