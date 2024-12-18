const Project = require("../models/Project");

// Create a new project
const createProject = async (req, res) => {
  try {
    const { userId } = req.user;
    const project = { ...req.body, user_id: userId };
    const newProject = new Project(project);
    await newProject.save();
    res.status(201).send(newProject);
  } catch (err) {
    res.status(400).send(err);
  }
};

// Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.send(projects);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Get project by ID
const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("user_id");
    if (project) return res.send(project);
    res.status(404).send({ message: "Project not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update project by ID
const updateProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (project) return res.send(project);
    res.status(404).send({ message: "Project not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete project by ID
const deleteProjectById = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (project) return res.send({ message: "Project deleted" });
    res.status(404).send({ message: "Project not found" });
  } catch (err) {
    res.status(500).send(err);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
};
