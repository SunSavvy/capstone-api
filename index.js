import express from "express";
import morgan from "morgan";
import cors from "cors";
import bodyParser from "body-parser";

// define app
const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// define routes
app.use("/", (req, res) => {
    res.status(200).json({
        message: "API OK",
    });
});

// listen app
app.listen(process.env.PORT || 5000, () => {
    process.env.PORT
        ? console.log(`App listening on port ${process.env.PORT}`)
        : console.log("App listening on port 5000");
});
