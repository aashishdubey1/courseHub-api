import express, {
  type Request,
  type Express,
  type Response,
  type NextFunction,
} from "express";
import serverConfig from "./config/serverConfig";
import helmet from "helmet";
import apiRoutes from "./routes/v1/index";

const app: Express = express();

app.use(express.json());
app.use(helmet());

app.use("/api/v1", apiRoutes);

app.get("/health", (req: Request, res: Response) => {
  res.send("OK");
});

app.listen(serverConfig.PORT, () => {
  console.log("server is running port", serverConfig.PORT);
});
