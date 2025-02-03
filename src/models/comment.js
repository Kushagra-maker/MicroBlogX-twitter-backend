import mongoose, { Mongoose } from "mongoose";


const commentSchema = mongoose.Schema(
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
        onModel: {
            type: String,
            required: true,
            enum: ["Tweet", "Comment"],
        },
        commentable: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            refPath: "onModel",
        },
    
    })

    const Comment = mongoose.model('Comment',commentSchema)

export default Comment;