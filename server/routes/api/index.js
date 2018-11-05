const express = require('express');
const router = express.Router();
const apiController = require('../../controllers/apiController');

// router.use("/books", bookRoutes);

router.get("/stations", apiController.getStations);
router.get("/songs/:name", apiController.getSongs);

module.exports = router;
