import Hashtag from "../models/hashtag.js";

import { CrudRepository } from "../repository/index.js";

class HashtagRepository extends CrudRepository{  

    constructor(){
        super(Hashtag) 
    }


    
    
    
    
    
    
    
    
    
    
    


    async bulkCreate (data){
        try{
            const tags = await Hashtag.insertMany(data);
            return tags;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

    async findByName(texts)
    {
        try{
            let hashtag = await Hashtag.find({
                text: { $in: texts } 
                
            });
            return hashtag;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }



    async deleteHashtag(data)
    {
        try{
            let hashtag = await Hashtag.deleteOne(data);
            return hashtag;
        }
        catch(error){
            console.log(error);
            throw error;
        }
    }

}

export default HashtagRepository;