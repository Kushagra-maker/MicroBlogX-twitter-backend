import TweetRepository from "../repository/tweet-repository.js";
import HashtagRepository from "../repository/hashtag-repository.js";

class TweetService {
  constructor() {
    this.tweetRepository = new TweetRepository();
    this.hashtagRepository = new HashtagRepository();
  }

  async create(data) {
    try {
        console.log("Received data:", data); 

        const { content, user, parentTweet = null, image} = data;

        console.log("Extracted content:", content);
        console.log("Extracted user:", user);
        console.log("Extracted parentTweet:", parentTweet);
        console.log("Extracted image:", image); 

        if (!content || !user) {
            throw new Error("Content and user are required to create a tweet.");
        }

        const tags = content.match(/#[a-zA-Z0-9_]+/g);
        const tagList = tags ? tags.map((tag) => tag.substring(1).toLowerCase()) : [];

        let tweetData = { content, user, image };  

        if (parentTweet) {
            tweetData.parentTweet = parentTweet;
            console.log("This is a reply tweet.");
        } else {
            console.log("This is a standalone tweet.");
        }

        console.log("Attempting to create tweet...");
        const tweet = await this.tweetRepository.create(tweetData);
        console.log("Tweet created successfully:", tweet);

        if (parentTweet) {
            console.log("Fetching parent tweet:", parentTweet);
            const parentTweetDoc = await this.tweetRepository.getTweet(parentTweet);
            
            if (!parentTweetDoc) {
                throw new Error("Parent tweet not found.");
            }

            console.log("Parent tweet found:", parentTweetDoc);
            parentTweetDoc.replies.push(tweet._id);
            await parentTweetDoc.save();
            console.log("Parent tweet updated with new reply.");
        }

        console.log("Processing hashtags...");
        let alreadyPresentTags = await this.hashtagRepository.findByName(tagList);
        let textOfPresentTags = alreadyPresentTags.map(tag => tag.text);
        let newTags = tagList.filter(tag => !textOfPresentTags.includes(tag));

        newTags = newTags.map(tag => ({
            text: tag,
            tweets: [tweet.id]
        }));

        if (newTags.length > 0) {
            console.log("Creating new hashtags:", newTags);
            await this.hashtagRepository.bulkCreate(newTags);
        }

        alreadyPresentTags.forEach(async (tag) => {
            tag.tweets.push(tweet.id);
            try {
                await tag.save();
                console.log("Updated existing hashtag:", tag.text);
            } catch (error) {
                console.error("Error saving tag:", error);
            }
        });

        console.log("Tweet creation complete.");
        return tweet;
    } catch (error) {
        console.error("Error in creating tweet:", error);
        throw new Error("Failed to create tweet.");
    }
}


  async getTweet(tweetId) {
    try {
      const tweet = await this.tweetRepository.getTweet(tweetId);
      if (!tweet) {
        throw new Error("Tweet not found");
      }
      return tweet;
    } catch (error) {
      console.error("Error fetching tweet:", error);
      throw new Error("Failed to fetch tweet.");
    }
  }
}

export default TweetService;
