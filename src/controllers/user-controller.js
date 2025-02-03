import UserService from "../services/user-service.js";

const userService = new UserService();

export const signUp = async ( req,res ) => {
    try{
        const data = req.body;
        
        const response = await userService.signUp(data);

        return res.status(201).json({
            success:true,
            message:"Successfully created a User",
            data: response,
            error:{}
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in creating a User. Try again",
            data: {},
            error:error
        });
    }
}




export const signIn = async ( req,res ) => {

    
    try{
        const data = req.body;
        
        const response = await userService.signIn(data);

        return res.status(201).json({
            success:true,
            message:"Successfully SignedIn a User",
            data: response,
            error:{}
        });
    }
    catch(error){
        return res.status(500).json({
            success:false,
            message:"Something went wrong in signing in a User. Try again",
            data: {},
            error:error
        });
    }
}
