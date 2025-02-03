import Comment from "../models/comment.js";
import { CrudRepository } from "../repository/index.js";

class CommentRepository extends CrudRepository {
  constructor() {
    super(Comment);
  }

  async getComment(id) {
    try {
      //return await Comment.findById(id).populate("user", "name");
      return await Comment.findById(id).populate("user", "name").populate("commentable", "content");
    } catch (error) {
      throw error;
    }
  }

  async getCommentsByTweet(tweetId) {
    try {
      return await Comment.find({ commentable: tweetId, onModel: "Tweet" }).populate("user", "name");
    } catch (error) {
      throw error;
    }
  }

  async getReplies(commentId) {
    try {
      return await Comment.find({ commentable: commentId, onModel: "Comment" }).populate("user", "name");
    } catch (error) {
      throw error;
    }
  }
}

export default CommentRepository;
