const express = require("express");
const db = require("../config/db");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// CREATE car
router.post("/", protect, (req, res) => {
  const { license_plate, car_type, model, manufacture_year, driver_phone } = req.body;

  db.query(
    "INSERT INTO cars (license_plate, car_type, model, manufacture_year, driver_phone) VALUES (?, ?, ?, ?, ?)",
    [license_plate, car_type, model, manufacture_year, driver_phone],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Car added successfully" });
    }
  );
});

// READ all cars
router.get("/", protect, (req, res) => {
  db.query("SELECT * FROM cars", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// UPDATE car
router.put("/:id", protect, (req, res) => {
  const { car_type, model, manufacture_year, driver_phone } = req.body;

  db.query(
    "UPDATE cars SET car_type=?, model=?, manufacture_year=?, driver_phone=? WHERE id=?",
    [car_type, model, manufacture_year, driver_phone, req.params.id],
    (err) => {
      if (err) return res.status(400).json(err);
      res.json({ message: "Car updated" });
    }
  );
});

// DELETE car
router.delete("/:id", protect, (req, res) => {
  db.query("DELETE FROM cars WHERE id=?", [req.params.id], (err) => {
    if (err) return res.status(400).json(err);
    res.json({ message: "Car deleted" });
  });
});

module.exports = router;
