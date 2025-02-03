import mongoose from 'mongoose';
import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  // Utility function to get the commentable (Tweet/Comment) based on model type
  async getCommentable(onModel, commentableId) {
    if (onModel === "Tweet") {
      return await this.tweetRepository.getTweet(commentableId);
    } else if (onModel === "Comment") {
      return await this.commentRepository.getComment(commentableId);
    } else {
      throw new Error("Invalid model type");
    }
  }

  // Method to create a new comment
  async createComment(content, userId, commentableId, onModel) {
    try {
      // Validate the inputs
      if (!content || !userId || !commentableId || !onModel) {
        throw new Error("All fields (content, userId, commentableId, onModel) are required");
      }

      // Get the commentable resource (Tweet or Comment)
      let commentable = await this.getCommentable(onModel, commentableId);

      if (!commentable) {
        return { success: false, message: `${onModel} not found`, data: null };
      }

      // Create the new comment
      const newComment = await this.commentRepository.create({
        content,
        user: userId,
        commentable: commentableId,
        onModel,
      });

      console.log(newComment instanceof mongoose.Document);


      // Populate the new comment with the user and commentable resource
      //await newComment.populate("user").populate("commentable").execPopulate();
      //const populatedComment = await newComment.populate("user", "name").populate("commentable", "content").exec();

      //const populatedComment = await this.commentRepository.getComment(newComment._id).populate("user", "name").populate("commentable", "content");


      return { success: true, message: "Comment added", data: newComment };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  // Get comments for a specific tweet
  async getCommentsForTweet(tweetId) {
    return await this.commentRepository.getCommentsByTweet(tweetId);
  }

  // Get replies for a specific comment
  async getRepliesForComment(commentId) {
    return await this.commentRepository.getReplies(commentId);
  }
}

export default CommentService;
