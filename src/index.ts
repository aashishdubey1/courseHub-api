import express, {
  type Request,
  type Express,
  type Response,
  type NextFunction,
} from "express";
import serverConfig from "./config/serverConfig";
import helmet from "helmet";
import apiRoutes from "./routes/v1/index";
import connectToDb from "./config/db.config";

const app: Express = express();

app.use(express.json());
app.use(helmet());
await connectToDb();

app.use("/api/v1", apiRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.listen(serverConfig.PORT, () => {
  console.log("server is running port", serverConfig.PORT);
});
