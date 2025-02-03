// like-repository.js
import Like from "../models/like.js";
import { CrudRepository } from "../repository/index.js";

class LikeRepository extends CrudRepository{
    // Your repository code here
    constructor() {
        super(Like);
      }
      async findByUserAndLikeable(data) { // helper method designed to query the database and retrieve a "like" document that matches specific conditions.
        try {
          const like = await Like.findOne(data); // Query the database
          return like; // Return the found "like" document
        } catch (error) {
          throw error;
        }
      }
    
}

export default LikeRepository; // Ensure this default export is there
