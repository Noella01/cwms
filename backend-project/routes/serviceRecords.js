const express = require("express");
const db = require("../config/db");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

/**
 * CREATE service record
 */
router.post("/", protect, (req, res) => {
  const { car_id, service_id, service_date, status } = req.body;

  db.query(
    "INSERT INTO service_records (car_id, service_id, service_date, status) VALUES (?, ?, ?, ?)",
    [car_id, service_id, service_date, status || "pending"],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Service record created" });
    }
  );
});

/**
 * READ all service records
 */
router.get("/", protect, (req, res) => {
  const query = `
    SELECT sr.id, sr.service_date, sr.status,
           c.license_plate, c.model,
           s.service_name, s.price
    FROM service_records sr
    JOIN cars c ON sr.car_id = c.id
    JOIN services s ON sr.service_id = s.id
    ORDER BY sr.service_date DESC
  `;

  db.query(query, (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

/**
 * UPDATE service record status
 */
router.put("/:id", protect, (req, res) => {
  const { status } = req.body;

  db.query(
    "UPDATE service_records SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Service record updated" });
    }
  );
});

/**
 * DELETE service record
 */
router.delete("/:id", protect, (req, res) => {
  db.query(
    "DELETE FROM service_records WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Service record deleted" });
    }
  );
});

module.exports = router;
