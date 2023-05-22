import axios from "axios";

const retrieveUV = async (req, res) => {
    try {
        await axios
            .get(process.env.API_URI, {
                headers: {
                    "x-access-token": process.env.KEY,
                    "Content-Type": "application/json",
                },
            })
            .then((response) => {
                console.log(response);
                res.status(200).json({ data: response.data });
            });
    } catch (error) {
        res.status(501).json({ message: error });
    }
};

export default retrieveUV;
