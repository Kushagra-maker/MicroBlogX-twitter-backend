import express from "express"
import {connect} from "./config/database.js";


import router from "./routes/index.js";
import TweetRepository from "./repository/tweet-repository.js";
import passport from "passport";
import { passportAuth } from "./middlewares/jwt-middleware.js";

const app = express();




app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
passportAuth(passport);

app.use("/api",router)

app.listen(3000, async ()=> {
    console.log("server started `at` 3000");
    
    connect();
  






    









    









});