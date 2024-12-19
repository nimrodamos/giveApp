const Project = require("../models/Project");
const { faker } = require("@faker-js/faker");

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

const getAllProjects = async (req, res) => {
  try {
    const { title, status, owner, category } = req.query;
    const limit = parseInt(req.query.limit) || 35;
    const query = {};

    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (owner) {
      query.owner = owner;
    }
    if (category) {
      query.category = category;
    }

    const projects = await Project.find(query).limit(limit);

    res.json(projects);
  } catch (err) {
    res.status(500).send({ error: "Error fetching projects", details: err });
  }
};

module.exports = { getAllProjects };
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

const getPopularProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    // Calculate the popularity based on current_amount / time_since_creation (in minutes)
    const popularProjects = projects.map((project) => {
      const creationDate = project.createdAt;
      const currentDate = new Date();

      const timeSinceCreationInMinutes =
        (currentDate - creationDate) / (1000 * 60);

      const popularityScore =
        project.current_amount / timeSinceCreationInMinutes;

      return {
        ...project.toObject(),
        popularityScore,
      };
    });

    popularProjects.sort((a, b) => b.popularityScore - a.popularityScore);

    const topPopularProjects = popularProjects.slice(0, 10);

    res.json(topPopularProjects);
  } catch (error) {
    res
      .status(500)
      .send({ error: "Error fetching popular projects", details: error });
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

//////////////////////////////////////
const getUserProjects = async (req, res) => {
  try {
    const userId = req.user.userId; // Get the logged-in user's ID from the token
    const projects = await Project.find({ user_id: userId }); // Query projects created by this user
    res.status(200).json({ projects });
  } catch (err) {
    console.error("Error fetching user projects:", err.message);
    res.status(500).json({ error: "Failed to fetch user projects" });
  }
};
///////////////////////////////////////
module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProjectById,
  deleteProjectById,
  getUserProjects,
  getPopularProjects,
};
