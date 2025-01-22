import express, { Express } from "express";
import cors from "cors"
import { tasksRouter } from "./routes";

const app: Express = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: "3mb" }));
app.use(express.urlencoded({ limit: "3mb", extended: true }));

app.use("/tasks", tasksRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});