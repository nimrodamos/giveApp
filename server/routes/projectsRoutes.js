const express = require("express");
/////////////////////////
const { authUser } = require("../middleware/authentication");
//////////////////////////////
const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getUserProjects,
  getPopularProjects,
} = require("../controllers/projectController");
const router = express.Router();

router.get("/popular", getPopularProjects);
router.get("/user", authUser, getUserProjects);
router.post("/", authUser, createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", authUser, updateProjectById);
router.delete("/:id", authUser, deleteProjectById);

module.exports = router;
