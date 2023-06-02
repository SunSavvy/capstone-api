import axios from "axios";
import csv from "csv-parser";
import { Storage } from "@google-cloud/storage";
// import tf from "@tensorflow/tfjs-node";
// import { loadGraphModel } from "@tensorflow/tfjs-node";

export const RetrieveUV = async (req, res) => {
    // ini kalo pake query parameter (di url masukkin latitue sama longitude)
    // const { latitute, longitude } = req.query;

    // in kalao pake query dari request body (misal manggil apinya dari form di aplikasi androidnya (semacam form login buat manggil api dan ngirim data latitute dan longitude))
    const { latitute, longitude } = req.body;
    try {
        await axios
            .get(
                `https://api.openuv.io/api/v1/uv?lat=${latitute}&lng=${longitude}}&alt=100&dt=`,
                {
                    headers: {
                        "x-access-token": process.env.KEY,
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                // console.log(response);
                res.status(200).json({
                    data: {
                        uv: response.data.result.uv,
                        uv_time: response.data.result.uv_time,
                        uv_max: response.data.result.uv_max,
                        uv_max_time: response.data.result.uv_max_time,
                    },
                });
            });
    } catch (error) {
        res.status(501).json({ message: error });
    }
};

export const Classify = async (req, res) => {
    try {
        const { skin_type, uv_index } = req.body; // angka desimal gunakan , bukan .
        const storage = new Storage();
        const bucketName = "sunsavvy";
        const fileName = "dataset.csv";

        const results = [];

        const bucket = storage.bucket(bucketName);
        const file = bucket.file(fileName);

        file.createReadStream()
            .pipe(csv())
            .on("data", (data) => {
                const skinType = parseFloat(data.Skin_type);
                const uvIndex = parseFloat(data["UV Index"]);

                if (
                    skinType === parseFloat(skin_type) &&
                    uvIndex === parseFloat(uv_index)
                ) {
                    if (results.length < 1) {
                        results.push({
                            skinType: skin_type,
                            uvIndex: uv_index,
                            spf: parseFloat(data.SPF),
                        });
                    }
                }
            })
            .on("end", () => {
                res.status(200).json({
                    message: "fetch success",
                    data: results,
                });
                console.log(results);
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
