import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import { PORT } from "./env.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json("Welcome to the weather API");
});

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}!`);
});
