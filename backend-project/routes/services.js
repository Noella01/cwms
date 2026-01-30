const express = require("express");
const db = require("../config/db");
const protect = require("../middleware/authMiddleware");


const router = express.Router();

// CREATE service
router.post("/", protect, (req, res) => {
  const { service_name, price } = req.body;

  db.query(
    "INSERT INTO services (service_name, price) VALUES (?, ?)",
    [service_name, price],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Service added" });
    }
  );
});

// READ services
router.get("/", protect, (req, res) => {
  db.query("SELECT * FROM services", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// UPDATE service
router.put("/:id", protect, (req, res) => {
  const { service_name, price } = req.body;

  db.query(
    "UPDATE services SET service_name=?, price=? WHERE id=?",
    [service_name, price, req.params.id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Service updated" });
    }
  );
});

// DELETE service
router.delete("/:id", protect, (req, res) => {
  db.query("DELETE FROM services WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: "Service deleted" });
  });
});

module.exports = router;

