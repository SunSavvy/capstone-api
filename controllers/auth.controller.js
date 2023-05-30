import User from "../models/user.js";
import bcrypt from "bcryptjs";

// functio buat regis akun baru
export const Register = async (req, res) => {
    try {
        // ambil data email dan password dari registrasi user
        const { email, password } = req.body;
        // cek apakah email dan password
        if (email !== undefined && password !== undefined) {
            // enkripsi password
            const hashedPassword = await bcrypt.hash(password, 15);
            // lanjut buat akun kalau password sudah dienkripsi
            if (hashedPassword) {
                const userData = new User({
                    email: email,
                    password: hashedPassword,
                });
                // simpan ke database
                await userData.save().then(() => {
                    res.status(201).json({
                        message: "User saved successfully",
                        data: userData,
                    });
                });
            }
        } else {
            req.status(501).json({
                message: "Invalid email or password",
            });
        }
    } catch (error) {
        // cek error email duplikat
        if (String(error.message).includes("index: email_1 dup key")) {
            res.status(200).json({ message: "Email is already used!" });
        } else {
            req.status(501).json({ message: error });
        }
    }
};

// function buat masukkin nama dan skintype
export const Preference = async (req, res) => {
    try {
        const { name, skintype, email } = req.body;

        if (
            name !== undefined &&
            skintype !== undefined &&
            email !== undefined
        ) {
            await User.findOneAndUpdate(
                {
                    email: email,
                },
                {
                    name: name,
                    skintype: skintype,
                },
                {
                    returnOriginal: false,
                }
            )
                .then(async () => {
                    res.status(200).json({
                        message: "Update was successful",
                        data: await User.findOne({
                            email: email,
                        }),
                    });
                })
                .catch(() => {
                    res.status(200).json({ message: "Update failed" });
                });
        }
    } catch (error) {
        res.status(500).json({ message: error });
    }
};

// function buat login
export const Login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (email !== undefined && password !== undefined) {
            const userFromDb = await User.findOne({
                email: email,
            });
            if (userFromDb) {
                if (await bcrypt.compare(password, userFromDb.password)) {
                    res.status(200).json({
                        message: "Welcome to SunSavvy",
                        data: userFromDb,
                    });
                } else {
                    res.status(404).json({
                        message: "Password does not match ",
                    });
                }
            } else {
                res.status(404).json({ message: "Email not found" });
            }
        } else {
            res.status(200).json({
                message: "Please fill the required email dan password ",
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error });
    }
};
