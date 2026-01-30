require("dotenv").config();
const express = require("express");
const cors = require("cors");
const carRoutes = require("./routes/cars");
const serviceRoutes = require("./routes/services");
const paymentRoutes = require("./routes/payments");
const serviceRecordRoutes = require("./routes/serviceRecords");
const app = express();
app.use("/api/service-records", serviceRecordRoutes);

app.use("/api/cars", carRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/payments", paymentRoutes);


const authRoutes = require("./routes/auth.js");


app.use(cors());
app.use(express.json());

app.use("/api/auth.js", authRoutes);

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

