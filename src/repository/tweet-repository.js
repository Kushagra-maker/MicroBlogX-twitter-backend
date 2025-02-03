// import Tweet from "../models/tweet.js";
// import { CrudRepository } from "../repository/index.js";


// class TweetRepository extends CrudRepository {
//     constructor() {
//       super(Tweet);
//     }

//     async create(data)
//     {
//         try{
//             let tweet = await Tweet.create(data);
//             return tweet;
//         }
//         catch(error){
//             console.log(error);
//             throw error;
//         }
//     }

//     async getAllTweets()
//     {
//         try{
//             let tweets = await Tweet.find({});
//             return tweets;
//         }
//         catch(error){
//             console.log(error);
//             throw error;
//         }
//     }


//     async getTweet(id)
//     {
//         try{
//             let tweet = await Tweet.findById(id);
//             return tweet;
//         }
//         catch(error){
//             console.log(error);
//             throw error;
//         }
//     }



//     async deleteTweet(data)
//     {
//         try{
//             let tweet = await Tweet.deleteOne(data);
//             return tweet;
//         }
//         catch(error){
//             console.log(error);
//             throw error;
//         }
//     }

// }


// export default TweetRepository
// /// CRUD - create get  delete



import Tweet from "../models/tweet.js";
import { CrudRepository } from "../repository/index.js";

class TweetRepository extends CrudRepository {
  constructor() {
    super(Tweet);
  }

  async create(data) {
    try {
      let tweet = await Tweet.create(data);

      // If this tweet is a reply, update the parent tweet's replies array
      if (data.parentTweet) {
        let parentTweet = await Tweet.findById(data.parentTweet);
        if (parentTweet) {
          parentTweet.replies.push(tweet._id);
          await parentTweet.save();
        }
      }

      return tweet;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getAllTweets() {
    try {
      return await Tweet.find({})
        .populate("user", "name")
        .populate({
          path: "replies",
          populate: { path: "user", select: "name" },
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTweet(id) {
    try {
      return await Tweet.findById(id)
        .populate("user", "name")
        .populate({
          path: "replies",
          populate: { path: "user", select: "name" },
        });
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getTweetWithThread(id) {
    try {
      return await Tweet.findById(id)
        .populate("user", "name")
        .populate({
          path: "replies",
          populate: { path: "user", select: "name" },
        });
    } catch (error) {
      throw error;
    }
  }

  async deleteTweet(id) {
    try {
      return await Tweet.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default TweetRepository;
