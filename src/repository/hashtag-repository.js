import Hashtag from "../models/hashtag.js";

import { CrudRepository } from "../repository/index.js";

class HashtagRepository extends CrudRepository{  //HashtagRepository is inheriting everything from CrudRepository

    constructor(){
        super(Hashtag) //call the constructor of the parent class (CrudRepository in this case). You're passing the Hashtag model to the parent class's constructor
    }

//hashtag single create
    // async create(data)
    // {
    //     try{
    //         let hashtag = await Hashtag.create(data);
    //         return hashtag;
    //     }
    //     catch(error){
    //         console.log(error);
    //         throw error;
    //     }
    // }


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
                text: { $in: texts } // This method expects text to be a single string. To handle an array, you might want to change it to use the $in operator.
                // text : text,
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