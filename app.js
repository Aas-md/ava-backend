require("dotenv").config();
const express = require("express");
const app = express();
let invoicesRoute = require("./Routes/invoicesRoute");
let userRoute = require("./Routes/userRoute");
const cors = require("cors");

app.use(express.json());
app.use(cors());

app.use('/users', userRoute);
app.use('/invoices', invoicesRoute);



app.use((req, res) => {
    res.status(404).send("Route Not Found");
});


app.listen(process.env.PORT, () => {
    console.log("Server running");
});