import { TweetRepository, LikeRepository, CommentRepository } from "../repository/index.js";

class LikeService {
    constructor() {
      this.likeRepository = new LikeRepository();
      this.tweetRepository = new TweetRepository();
      this.commentRepository = new CommentRepository();
    }

  

    async toggleLike(modelId, modelType, userId) {  

    
    let likeable;

    
      if (modelType == "Tweet") {
        likeable = await this.tweetRepository.getTweet(modelId); 
      } else if (modelType == "Comment") {
        likeable = await this.commentRepository.getComment(modelId);
      } else {
        throw new Error("unknown model type");
      }

      if (!likeable) {
        return { success: false, message: `${modelType} not found`, data: null };
    }


      
      const exists = await this.likeRepository.findByUserAndLikeable({ 
        user: userId,
        onModel: modelType,
        likeable: modelId,
      });

      
      if (exists) {
        
        
        likeable.likes.pull(exists.id);
        await likeable.save();
        
        await this.likeRepository.destroy(exists.id);

        
        return { success: true, message: "Like removed", data: null };

      }
      else{
        const newLike = await this.likeRepository.create({ 
          user: userId,
          onModel: modelType,
          likeable: modelId,
        });

        likeable.likes.push(newLike);
        await likeable.save();
        
        return { success: true, message: "Like added", data: newLike };
      }
      
    }
  }

  export default LikeService;