let express = require("express");
const supabase = require("../supabase");
const genAI = require("../gemini");

let router = express.Router();


// -------- SIGNUP --------
router.post("/signup", async (req, res) => {

    const { name, email, password } = req.body;

    try {
        const { data, error } = await supabase
            .from("users")
            .insert([{ name, email, password }]);

        if (error) {
            return res.send("Error " + error.message);
        }

        res.send("User Registered");
    } catch (err) {
        res.send("Error" + err.message);
    }
});


// -------- LOGIN --------
router.post("/login", async (req, res) => {

    const { email, password } = req.body;

    try {
        const { data } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", password);

        if (data.length > 0) {
            res.send("Login Success");
        } else {
            res.send("Invalid Credentials");
        }
    } catch (err) {
        res.send("Error" + err.message);
    }
});

module.exports = router;
