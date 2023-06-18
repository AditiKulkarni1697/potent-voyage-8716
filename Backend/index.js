// NPM Install
require("dotenv").config();


const path = require("path")
const bcrypt = require("bcrypt")
const express = require("express")

const cors = require("cors");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

// Project files import
require("./google-oauth");
const { connection } = require("./db");
const { isLoggedIn } = require("./middlewares/isLogged");
const { authenticate } = require("./middlewares/authentication.middleware");

const { userRoute } = require("./routes/user.routes");
const { projectRoute } = require("./routes/project.route");
const { calenderRouter } = require("./routes/calender.route");
const { timerRoute } = require("./routes/timer.route");
const { taskRoute } = require("./routes/task.route");
const {UserModel} = require("./models/user.model")

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.get("/", (req, res) => {
  res.send("B26_Time-Trace_Project");
});
// app.use(authenticate)
app.use("/user", userRoute);

app.use("/timer", timerRoute);
app.use("/calender", calenderRouter);
app.use("/project", projectRoute);

app.use("/task", taskRoute);

// app.get('/auth/google',
//   passport.authenticate('google', { scope: ['profile','email'] }));

// app.get('/auth/google/callback',
//   passport.authenticate('google', {successRedirect: '/', failureRedirect: '/login', session : false}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     console.log(req)
//     res.redirect('/');
//   });

// Oauth google passport oauth2

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

app.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    successRedirect: "/protected",
    failureRedirect: "/auth/google/failure",
  })
);

app.get("/auth/google/success",(req,res)=>{
    res.redirect("http://localhost:5501/Frontend/homepage/index.html")
})


app.get("/auth/google/failure", (req, res) => {
  res.send("Failed !");
});

app.get('/protected', async (req, res) => {
      console.log(req.user)
    
      console.log(req.user.emails)
      
      const isUserPresent = await UserModel.findOne({email:req.user._json.email})
      // console.log(isUserPresent)
      if(!isUserPresent){
          let password = "12345"
          const hashPass = await bcrypt.hash(password,4);
          const user = {
            name : req.user._json.name,
            email : req.user._json.email,
            password : hashPass
          }
          
          const newUser = new UserModel(user)
          await newUser.save()
          res.redirect("http://127.0.0.1:5501/Frontend/project_timer_pages/project.html");
      }else{
        res.redirect("http://127.0.0.1:5501/Frontend/project_timer_pages/project.html");
      }
  });



app.get("/protected", (req, res) => {
  res.redirect("http://127.0.0.1:5501/Frontend/homepage/index.html");
});

//   Github Authentication


app.get("/auth/github",async(req,res)=>{

    const {code} = req.query

    const accessToken = await fetch("https://github.com/login/oauth/access_token",{
        method: "POST",
        headers :{
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            client_id : process.env.GITHUB_CLILENT_ID,
            client_secret : process.env.GITHUB_CLILENT_SECRET,
            code 
        })
    }).then(response => {
      return response.json()
    })

    console.log(accessToken)
    res.cookie("accessToken",accessToken.access_token)

    const user = await fetch("https://api.github.com/user",{
      headers : {
        Authorization : `Bearer ${accessToken.access_token}`
      }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))

    console.log(user)

    const useremail = await fetch("https://api.github.com/user/emails",{
      headers : {
        Authorization : `Bearer ${accessToken.access_token}`
      }
    })
    .then((res) => res.json())
    .catch((err) => console.log(err))

    console.log(useremail)

    res.redirect("http://127.0.0.1:5501/Frontend/project_timer_pages/project.html")
})

app.get('/login',  (req, res) => {
    res.redirect("http://127.0.0.1:5501/Frontend/login_signup_pages/register.html");
  });

  





app.get("/auth/protected", isLoggedIn, (req, res) => {
  res.send("Hello there!");
});

// Connection to the server
app.listen(process.env.PORT || 3000, async () => {
  console.log(`server is running on port ${process.env.PORT}`);
  try {
    await connection;
    console.log("Connect to DataBase");
  } catch (error) {
    console.log(error.message);
    console.log("Cannot connect to DataBase");
  }
});



