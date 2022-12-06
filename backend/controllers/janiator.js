const {
  getUnassignedJan,
  getAssignedJanByMcpId,
} = require("../model/janiator");

const getAllJaniator = async (req, res, next) => {
  const week = Number(req.query.week);
  const month = Number(req.query.month);
  res.status(200).json(getUnassignedJan(month, week));
};

const getJaniatorAssignedMCP = async (req, res, next) => {
  const week = Number(req.query.week);
  const month = Number(req.query.month);
  const mcpId = Number(req.query.mcpId);
  res.status(200).json(getAssignedJanByMcpId(mcpId, month, week));
};

module.exports = { getAllJaniator, getJaniatorAssignedMCP };
