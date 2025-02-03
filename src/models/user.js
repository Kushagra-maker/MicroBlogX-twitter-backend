import mongoose, { Mongoose } from "mongoose";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
      },
    password: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
    tweets: [
        {
            type: mongoose.Schema.Types.ObjectId
        }  
    ],
    name: {
        type: String,
        required: true,
    },
});

userSchema.pre("save", function (next) {  //This is a pre-save hook in Mongoose. It runs before saving a document to the database. The function inside this hook has access to the document being saved via the this keyword.
    
    const user = this; //The this refers to the document being saved. The user variable is assigned to this for easier reference.
    const SALT = bcrypt.genSaltSync(9); //bcrypt.genSaltSync(9) generates a salt (random string) used to enhance the security of the password hashing process. The number 9 is the cost factor, which determines the complexity of the salt. A higher number makes the hashing process more secure but slower.
    const encryptedPassword = bcrypt.hashSync(user.password, SALT); //bcrypt.hashSync() hashes the user's password (stored in user.password) using the generated SALT.
    user.password = encryptedPassword;
    next(); // next() is called to indicate that the middleware has finished its task. Without next(), the save operation would hang because Mongoose would think the middleware is still running.
})

userSchema.methods.comparePassword = function compare(password){
    const user = this;
    return bcrypt.compareSync(password,user.password)
}

userSchema.methods.genJWT = function generate() {
    return JWT.sign( //used to create a JWT token. It takes three arguments:1.Payload (user data) 2.Secret key (used to encrypt the token) 3.Options (e.g., expiration time)
      { id: this._id, email: this.email }, // data inside the JWT (payload).
      "twitter_secret", // Signing the Token with a Secret Key. It ensures that only the server can verify and decode the token.
      
      {
        expiresIn: "1h",
      }
    );
  };

  /*How This Works in Practice
    1. When a User Logs In or Signs Up
    2. The backend retrieves user details from the database.
    3. It calls user.genJWT() to generate a JWT token.
    4. The backend sends the token to the frontend.
    5. The frontend stores the token (e.g., in localStorage or cookies).
    6. The token is used for authenticated API requests.*/

const User = mongoose.model('User',userSchema)

export default User;