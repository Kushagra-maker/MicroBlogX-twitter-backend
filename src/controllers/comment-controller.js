import CommentService from "../services/comment-service.js";

const commentService = new CommentService();

export const createComment = async (req, res) => {
  try {
    const { content, commentableId, onModel } = req.body;
    const userId = req.user.id;

    const response = await commentService.createComment(content, userId, commentableId, onModel);
    if (!response.success) {
      return res.status(404).json({ message: response.message });
    }

    return res.status(201).json({ message: "Comment created", data: response.data });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const getCommentsForTweet = async (req, res) => {
  try {
    const tweetId = req.params.id;
    const comments = await commentService.getCommentsForTweet(tweetId);
    return res.status(200).json({ message: "Comments fetched", data: comments });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getRepliesForComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const replies = await commentService.getRepliesForComment(commentId);
    return res.status(200).json({ message: "Replies fetched", data: replies });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
