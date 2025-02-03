import mongoose from 'mongoose';
import { CommentRepository, TweetRepository } from "../repository/index.js";

class CommentService {
  constructor() {
    this.commentRepository = new CommentRepository();
    this.tweetRepository = new TweetRepository();
  }

  
  async getCommentable(onModel, commentableId) {
    if (onModel === "Tweet") {
      return await this.tweetRepository.getTweet(commentableId);
    } else if (onModel === "Comment") {
      return await this.commentRepository.getComment(commentableId);
    } else {
      throw new Error("Invalid model type");
    }
  }

  
  async createComment(content, userId, commentableId, onModel) {
    try {
      
      if (!content || !userId || !commentableId || !onModel) {
        throw new Error("All fields (content, userId, commentableId, onModel) are required");
      }

      
      let commentable = await this.getCommentable(onModel, commentableId);

      if (!commentable) {
        return { success: false, message: `${onModel} not found`, data: null };
      }

      
      const newComment = await this.commentRepository.create({
        content,
        user: userId,
        commentable: commentableId,
        onModel,
      });

      console.log(newComment instanceof mongoose.Document);


      
      
      

      


      return { success: true, message: "Comment added", data: newComment };
    } catch (error) {
      return { success: false, message: error.message, data: null };
    }
  }

  
  async getCommentsForTweet(tweetId) {
    return await this.commentRepository.getCommentsByTweet(tweetId);
  }

  
  async getRepliesForComment(commentId) {
    return await this.commentRepository.getReplies(commentId);
  }
}

export default CommentService;
