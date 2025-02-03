// user-repository.js
import User from "../models/user.js";
import { CrudRepository } from "../repository/index.js";

class UserRepository extends CrudRepository{
    // Your repository code here
    constructor() {
        super(User);
      }
      async findBy(data) {
        try {
          const response = await User.findOne(data); // data is expected to be an object
          return response;
        } catch (error) {
          throw error;
        }
      }

}

export default UserRepository; // Ensure this default export is there
