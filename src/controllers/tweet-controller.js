import TweetService from "../services/tweet-service.js";
import upload from "../config/file-upload-s3.js";
import { SuccessCodes } from "../utils/error-codes.js"; 

const tweetService = new TweetService();
const singleUploader = upload.single("image");

export const createTweet = async (req, res) => {
    singleUploader(req, res, async function (err) {
        if (err) {
            return res.status(500).json({ 
                success: false,
                message: "Error uploading image",
                data: {},
                error: err.message,
            });
        }

        try {
            const payload = { ...req.body };
            
            
            if (req.file) {
                payload.image = req.file.location;
            }

            const response = await tweetService.create(payload);

            return res.status(SuccessCodes.CREATED).json({
                success: true,
                message: "Successfully created the Tweet",
                data: response,
                error: {},
            });
        } catch (error) {
            console.error("Error in createTweet:", error);
            return res.status(500).json({
                success: false,
                message: "Something went wrong in creating the Tweet. Try again",
                data: {},
                error: error.message,
            });
        }
    });
};

export const getTweet = async (req, res) => {
    try {
        const id = req.params.id;
        const response = await tweetService.getTweet(id);

        return res.status(SuccessCodes.OK).json({
            success: true,
            message: "Successfully fetched a tweet",
            data: response,
            error: {},
        });
    } catch (error) {
        console.error("Error in getTweet:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in fetching a tweet. Try again",
            data: {},
            error: error.message,
        });
    }
};
































































