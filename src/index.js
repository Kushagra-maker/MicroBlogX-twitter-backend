import express from "express"
import {connect} from "./config/database.js";
// import Tweet from "./models/tweet.js";
// import Hashtag from "./models/hashtag.js";
import router from "./routes/index.js";
import TweetRepository from "./repository/tweet-repository.js";
import passport from "passport";
import { passportAuth } from "./middlewares/jwt-middleware.js";

const app = express();



// Use Express built-in JSON parser for incoming request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use("/api",router)

app.listen(3000, async ()=> {
    console.log("server started `at` 3000");
    //mongodb connection establishment
    connect();
  

//     Tweet.create({
//         content: "This is my first Tweet",
//         likes: 25,
//         noOfRetweets: 5,
//         comment: "This is my first comment"
    
// })




// Hashtag.create({
//  text: "travel",
//tweets: ['678ea35ea4434ec8d3520d2a']
// })
    


// const tweetRepo = new TweetRepository();

// let tweet = await tweetRepo.deleteTweet({
//     _id:'678ea35ea4434ec8d3520d2a'});
// console.log(tweet);


});