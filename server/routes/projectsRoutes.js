const express = require("express");
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
} = require("../controllers/projectController");
const { authUser } = require("../middleware/authentication");
const router = express.Router();

router.post("/", authUser, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", authUser, updateProjectById);
router.delete("/:id", authUser, deleteProjectById);

module.exports = router;
