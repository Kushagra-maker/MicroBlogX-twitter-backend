// It will use Passport.js to authenticate users by verifying their JWT tokens.  It checks if the provided token is valid and corresponds to an existing user in the database. If valid, the user details are attached to req.user; otherwise, authentication fails, returning false.






import JWT from "passport-jwt"; // a Passport.js strategy for JWT-based authentication. JWT-based authentication (JSON Web Token authentication) is a method of securing APIs or web applications using a token that contains information about the user’s identity and other claims.
import User from "../models/user.js";
import passport from "passport";

const JWTStrategy = JWT.Strategy; // authentication strategy that verifies JWTs.
const ExtractJwt = JWT.ExtractJwt; // helps extract JWT from requests.

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extracts the JWT token from the Authorization header in Bearer format (e.g., Authorization: Bearer <token>).
  secretOrKey: "twitter_secret", // A secret key used to verify the JWT token. This must match the key used when signing tokens.
};

export const passportAuth = (passport) => { //This function takes passport as an argument, which is the Passport.js authentication library. It configures Passport.js to use JWT authentication. It checks if a JWT token sent in a request belongs to a valid user.
  
  try {
    passport.use( // tells Passport.js to use a JWT-based authentication strategy.
      new JWTStrategy(opts, /*callback ---> */ async (jwt_payload, done) => { // initializes the strategy: 1.) opts: Contains JWT settings (e.g., secret key, where to find the token). 2.)Callback: A function that processes the extracted JWT token.

        const user = await User.findById(jwt_payload.id); //jwt_payload contains the decoded JWT token. The function extracts the id from the token.

        if (!user) {
          done(null, false);
        } else {
          done(null, user);
        }
      })
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};




/* How This Works in Practice
1. A user logs in and gets a JWT token.
2. The user makes an API request and sends the token in the Authorization header.
3. Passport.js extracts the token, decodes it, and gets the user ID.
4. The function checks the database for the user.
5. If found, the user is authenticated and can access the resource.
6. If not, access is denied. */