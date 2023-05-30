import mongoose from "mongoose";

const schema = new mongoose.Schema({
    // field email, unik ( tidak boleh duplikat )
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    name: {
        type: String,
    },
    skintype: {
        type: String,
    },
});

export default mongoose.model("User", schema);
