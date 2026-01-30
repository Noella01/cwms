const express = require("express");
const db = require("../config/db");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE payment
router.post("/", protect, (req, res) => {
  const { service_record_id, amount, payment_method, payment_date } = req.body;

  db.query(
    "INSERT INTO payments (service_record_id, amount, payment_method, payment_date) VALUES (?, ?, ?, ?)",
    [service_record_id, amount, payment_method, payment_date],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Payment recorded" });
    }
  );
});

// READ payments
router.get("/", protect, (req, res) => {
  const query = `
    SELECT p.*, c.license_plate, s.service_name
    FROM payments p
    JOIN service_records sr ON p.service_record_id = sr.id
    JOIN cars c ON sr.car_id = c.id
    JOIN services s ON sr.service_id = s.id
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

module.exports = router;
