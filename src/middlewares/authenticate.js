import passport from "passport";

export const authenticate = (req, res, next) => { // next: A function to pass control to the next middleware in the chain.
  passport.authenticate("jwt", (err, user) => { //This line tells Passport to use the "jwt" strategy to authenticate the request. The "jwt" strategy checks for a JWT token (usually in the Authorization header) and verifies it.

    if (err) next(err); // If an error occurs during the authentication process, this line passes the error to the next middleware.

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized access",
      });
    }

    req.user = user; // Attaches the user object to req.user. This means that any subsequent middleware or route handler can access the authenticated user's information.
    next();
  })(req, res, next); // When you call passport.authenticate("jwt", callback), Passport returns a function. This returned function is designed to act as middleware—it expects to be called with the request (req), response (res), and next middleware (next) as arguments. The extra parentheses : )(req, res, next) at the end immediately call the function that was returned by passport.authenticate("jwt", callback).
};