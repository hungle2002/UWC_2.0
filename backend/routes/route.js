const express = require("express");
const router = express.Router();
const { getAllRoutes } = require("../controllers/route");

router.route("/").get(getAllRoutes).post(updateRoute);

module.exports = router;
