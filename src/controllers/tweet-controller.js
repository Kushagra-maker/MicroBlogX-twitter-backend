import TweetService from "../services/tweet-service.js";
import upload from "../config/file-upload-s3.js";
import { SuccessCodes } from "../utils/error-codes.js"; // Ensure you import this

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
            
            // Ensure `req.file` exists before accessing location
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













// import TweetService from "../services/tweet-service.js";


// const tweetService = new TweetService();

// export const createTweet = async ( req,res ) => {
//     try{
//         const data = req.body;
//         const response = await tweetService.create(data);

//         return res.status(201).json({
//             success:true,
//             message:"Successfully created a tweet",
//             data: response,
//             error:{}
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong in creating the Tweet. Try again",
//             data: {},
//             error:error
//         });
//     }
// }


// export const getTweet = async ( req,res ) => {
//     try{
//         // console.log(req.params); ------> Logs the parameters from the URL
//         const id = req.params.id; // This is the problem (missing `const` or `let`) while using get request in postman. Specifically, you are trying to access req.params.id, but you are assigning it directly to id without using const or let. This results in a ReferenceError. Use `const` to declare the variable.
//         const response = await tweetService.getTweet(id);
//         // console.log(response)

//         return res.status(201).json({
//             success:true,
//             message:"Successfully fetched a tweet",
//             data: response,
//             error:{}
//         });
//     }
//     catch(error){
//         return res.status(500).json({
//             success:false,
//             message:"Something went wrong in fetching a tweet. Try again",
//             data: {},
//             // error:error
//             error: error.message  // Replace error: error with error: error.message in the response to return a more descriptive error message.
//         });
//     }
// }