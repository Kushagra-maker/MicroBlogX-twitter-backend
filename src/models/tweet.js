// import mongoose from "mongoose";

// const tweetSchema = new mongoose.Schema({
//     content: {
//         type: String,
//         required: true,
//     },
//     likes: [
//         {
//             type: mongoose.Schema.Types.ObjectId, //each item in the likes array will be a MongoDB ObjectId. Each ObjectId in the likes array might represent a user who has liked the tweet. The ObjectId would refer to a User document in the User collection.

//             ref: "Like", //ObjectIds in the likes array refer to documents in the Like collection.

//         },
//     ],
//     noOfRetweets: {
//         type: Number
//     },
//     comment: [
//         {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Comment",
//         },
//       ],
// });

// const Tweet = mongoose.model('Tweet',tweetSchema)

// export default Tweet;




import mongoose from "mongoose";

const tweetSchema = mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    parentTweet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tweet",
      default: null,
    },
    replies: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tweet",
      },
    ],
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Like",
      },
    ],
    image: {
      type: String,
    },

  },
  { timestamps: true }
);

const Tweet = mongoose.model("Tweet", tweetSchema);
export default Tweet;
