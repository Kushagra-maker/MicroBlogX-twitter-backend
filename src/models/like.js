import mongoose from "mongoose";


const likeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
    },
    onModel:{ // tells what type of thing the "Like" is for
        type: String,
        required: true, // a like cannot exist without tweet
        enum : ["Tweet", "Comment"] // If you try to save anything else, like "User" or "Post", it will throw an error.
    },
    likeable :{ // This is the actual thing that was liked (e.g., the specific Tweet or Comment).
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        refPath: 'onModel' //  Dynamic reference based on `onModel`. If onModel is "Tweet", it will look for this ID in the Tweet collection.
    }
    
})

const Like = mongoose.model('Like',likeSchema)

export default Like;