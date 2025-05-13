import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import router from "./app/routes";
// import router from "./app/routes";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

// application routes
app.use("/", router);

app.get("/", (req: Request, res: Response) => {
  const name = "Hello World!";
  res.send(name);
});

export default app;
