import axios from "axios";

const retrieveUV = async (req, res) => {
    const { latitute, longitude } = req.params || req.body;
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
                res.status(200).json({ data: response.data });
            });
    } catch (error) {
        res.status(501).json({ message: error });
    }
};

export default retrieveUV;
