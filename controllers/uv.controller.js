import axios from "axios";

const retrieveUV = async (req, res) => {
    const { latitute, longitude } = req.query;
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
                console.log(response);
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

export default retrieveUV;
