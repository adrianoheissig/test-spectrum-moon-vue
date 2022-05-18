import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes/index.js";

dotenv.config();
const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:4000" }));
app.use(express.json());
app.use(router);
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running at port: ${PORT}`));
