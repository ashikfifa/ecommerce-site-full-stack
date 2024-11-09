import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import connectDB from "./config/connnectDB.js";
import userRouter from "./route/user.route.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use(morgan());
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);

const PORT = 8080 || env.process.PORT;



app.get(
  ("/",
  (req, res) => {
    res.json({
      message: "Server is running at " + PORT,
    });
  })
);

app.use('/api/user', userRouter)

connectDB().then(()=>{
  app.listen(PORT,()=>{
    console.log('server is running');
    
  })
})
