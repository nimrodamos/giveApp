const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projectController");

const router = express.Router();

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProjectById);
router.delete("/:id", deleteProjectById);

module.exports = router;
