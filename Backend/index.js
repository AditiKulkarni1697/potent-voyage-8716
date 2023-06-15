
require("dotenv").config();
const express = require("express")
const cors = require("cors");
const passport = require("passport")
 require("./google-oauth")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const {connection} = require("./db");
const {isLoggedIn} = require("./middlewares/isLogged")
const { userRoute } = require("./routes/user.routes");
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(cors());

app.get("/",(req,res)=>{
    res.send("B26_Time-Trace_Project")
})

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));

// app.get('/auth/google/callback', 
//   passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login', session : false}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log(req)
//     res.redirect('/');
//   });


app.use("/user", userRoute)


// Oauth google passport oauth2

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))
  app.use(passport.initialize())

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get( '/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/google/success',
        failureRedirect: '/auth/google/failure'
}));

app.get("/auth/google/failure",(req,res)=>{
    res.send("Failed !")
})

app.get("/auth/protected",isLoggedIn,(req,res)=>{
    res.send("Hello there!")
})

app.listen(process.env.PORT || 3000 , async()=>{
    console.log(`server is running on port ${process.env.PORT}`)
    try {
        await connection
        console.log("Connect to DataBase")
    } catch (error) {
        console.log(error.message)
        console.log("Cannot connect to DataBase")
    }
})


