import { TweetRepository, LikeRepository, CommentRepository } from "../repository/index.js";

class LikeService {
    constructor() {
      this.likeRepository = new LikeRepository();
      this.tweetRepository = new TweetRepository();
      this.commentRepository = new CommentRepository();
    }

  //  the logic for liking or unliking a resource (like a Tweet or Comment)

    async toggleLike(modelId, modelType, userId) {  // modelId: The ID of the resource (e.g., a Tweet or Comment) the user is liking/unliking. modelType: The type of the resource (e.g., "Tweet" or "Comment"). This helps the function know what kind of resource to query. userId: The ID of the user performing the action.

    // /api/v1/likes/toggle?id=modelId&modelType=Tweet
    let likeable;

    // Determine if the like is for a Tweet or a Comment
      if (modelType == "Tweet") {
        likeable = await this.tweetRepository.getTweet(modelId); //retrieves the specific tweet from the database
      } else if (modelType == "Comment") {
        likeable = await this.commentRepository.getComment(modelId);
      } else {
        throw new Error("unknown model type");
      }

      if (!likeable) {
        return { success: false, message: `${modelType} not found`, data: null };
    }


      // Check if the like already exists
      const exists = await this.likeRepository.findByUserAndLikeable({ //checks if the user has already liked the resource. A repository function that queries the database to see if there’s an existing "like" by the user on the given resource (modelId) of type modelType.
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });

      // let isAdded;
      if (exists) {
        
        //need to implement the functionality for deleting the existing "like".
        likeable.likes.pull(exists.id);
        await likeable.save();
        //await exists.deleteOne();  ----> Predefined Mongoose method. Deletes a single document from the database. Does not trigger Mongoose middleware (like pre or post hooks).
        await this.likeRepository.destroy(exists.id);

        // isAdded = false;
        return { success: true, message: "Like removed", data: null };

      }
      else{
        const newLike = await this.likeRepository.create({ //A new "like" document is created in the database
          user: userId,
          onModel: modelType,
          likeable: modelId,
        });

        likeable.likes.push(newLike);
        await likeable.save();
        // isAdded = true;
        return { success: true, message: "Like added", data: newLike };
      }
      // return isAdded;
    }
  }

  export default LikeService;