import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes/routes";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import cookieParser from "cookie-parser";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.set("trust proxy", 1);

app.use(
  cors({
    origin: ["http://localhost:5173","https://cabanaut-frontend.vercel.app"],
    credentials: true,
  })
);


app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to Cabanaut",
  });
});
app.use(globalErrorHandler);
app.use(notFound);
export default app;
