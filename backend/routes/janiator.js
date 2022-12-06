const express = require("express");
const router = express.Router();
const { getAllJaniator, getJaniatorAssignedMCP } = require("../controllers/janiator");

router.route("/").get(getAllJaniator);
router.route("/mcp").get(getJaniatorAssignedMCP);

module.exports = router;
