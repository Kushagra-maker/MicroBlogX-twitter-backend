import LikeService from "../services/like-service.js";


const likeService = new LikeService();

export const toggleLike = async (req, res) => {
    try{
        const data = req.body;
        const response = await likeService.toggleLike(
            data.modelId,
            data.modelType,
            data.user
        );
        
        return res.status(201).json({
            success: true,
            message: response.message,
            data: response.data,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong in toggling like",
            error: error.message,
        });
    }
}
