const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projectController");
const auth = require("../middleware/authentication");

const router = express.Router();

router.post("/", auth, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", auth, updateProjectById);
router.delete("/:id", auth, deleteProjectById);

module.exports = router;
