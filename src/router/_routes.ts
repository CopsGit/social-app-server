import {Router} from "express";
import userRouter from "./userRoute";
import indexRouter from "./indexRoute";
import followRouter from "./followRoute";
import postRouter from "./postRoute";
import activityRouter from "./activityRoute";
import dashboardRouter from "./dashboardRoute";

const routers = Router();

routers.use("/", indexRouter);
routers.use("/user", userRouter);
routers.use("/follow", followRouter);
routers.use("/post", postRouter);
routers.use("/activity", activityRouter);
routers.use("/dash", dashboardRouter);

export default routers;