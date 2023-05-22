import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
dotenv.config();
import uvroute from "./routes/uv.route.js";
import retrieveUV from "./controllers/uv.controller.js";

// define app
const app = express();
app.use(express.json());
app.use(cors());
app.options("*", cors());
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.get("/", (req, res) => {
    res.status(200).json({
        message: "API OK",
    });
});

// uv index routes
app.use("/api/uv", uvroute);
// app.get("/uvindex", retrieveUV);

// listen app
app.listen(process.env.PORT || 5001, () => {
    process.env.PORT
        ? console.log(`App listening on port ${process.env.PORT}`)
        : console.log("App listening on port 5001");
});
