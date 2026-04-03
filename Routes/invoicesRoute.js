let express = require("express");
let supabase = require("../supabase");
let router = express.Router();
const genAI = require("../gemini");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
require("dotenv").config();





// -------- FILE UPLOAD --------
router.post("/upload-file", upload.single("file"), async (req, res) => {

    try {
        const file = req.file;

        const fileName = Date.now() + "-" + file.originalname;

        // upload to supabase storage
        const { data, error } = await supabase.storage
            .from("invoices")
            .upload(fileName, file.buffer);

        if (error) {
            return res.send("Upload Error " + error.message);
        }

        // get public URL
        const { data: urlData } = supabase.storage
            .from("invoices")
            .getPublicUrl(fileName);

        const fileUrl = urlData.publicUrl;

        // save in DB
        await supabase
            .from("files")
            .insert([{
                file_name: fileName,
                file_url: fileUrl
            }]);

        res.send({
            message: "File uploaded",
            url: fileUrl
        });

    } catch (err) {
        console.log(err);
        res.send("Error uploading file");
    }
});

//add invoice route

router.post("/add-invoice", async (req, res) => {

    try {
        const { vendor, date, total_amount } = req.body;

        let {error} = await supabase
            .from("invoices")
            .insert([{ vendor, date, total_amount }]);

        if (error) {
            return res.send("Error saving invoice" + error.message);
        }


        res.send("Invoice saved");

    } catch (err) {
        res.send("Error saving invoice"  + err.message);
    }
});


//analytics route - total invoices
router.get("/total-invoices", async (req, res) => {

    try {
        const { data } = await supabase
            .from("invoices")
            .select("*");

        res.send({ total: data.length });

    } catch (err) {
        res.send("Error");
    }
});


// total spend analytics route
router.get("/total-spend", async (req, res) => {

    try {
        const { data } = await supabase
            .from("invoices")
            .select("total_amount");

        let sum = 0;

        data.forEach(i => {
            sum += Number(i.total_amount);
        });

        res.send({ total_spend: sum });

    } catch (err) {
        res.send("Error");
    }
});

// spend by vendor analytics route

router.get("/vendor-spend", async (req, res) => {

    try {
        const { data } = await supabase
            .from("invoices")
            .select("*");

        let result = {};

        data.forEach(i => {
            if (!result[i.vendor]) {
                result[i.vendor] = 0;
            }
            result[i.vendor] += Number(i.total_amount);
        });

        res.send(result);

    } catch (err) {
        res.send("Error");
    }
});


// -------- PARSE INVOICE --------
router.post("/parse-invoice", async (req, res) => {

    try {
        const { text } = req.body;

        const model = genAI.getGenerativeModel({   model: "gemini-2.0-flash" });

        const result = await model.generateContent(
            `Convert this invoice text into JSON with fields: vendor, date, total_amount\n\n${text}`
        );

        const response = await result.response;
        const data = response.text();

        res.send(data);

    } catch (err) {
        
        res.send("Gemini Error" + err.message);
    }
});

module.exports = router;
