import Project from "./project";
import ui from "./ui";

let projects = []; // Store all projects here.
let currentProject = null; // Track the currently active project.

const addProject = (name) => {
  if (!projects.some((project) => project.name === name)) {
    const newProject = new Project(name);
    projects.push(newProject);

    if (!currentProject) {
      currentProject = newProject;
    }
  }
  updateStorage();
};

const getProject = (name) => projects.find((project) => project.name === name);
const deleteProject = (name) => {
  let result = confirm(
    "This action is irreversible. Are you sure you want to delete this project?"
  );
  if (!result) {
    return;
  }
  projects = projects.filter((project) => project.name !== name);
  if (currentProject && currentProject.name === name) {
    currentProject = projects.length > 0 ? projects[0] : null;
  }
  updateStorage();
  ui.renderProjectList();
};
const setCurrentProject = (name) => {
  const project = getProject(name);
  if (project) currentProject = project;
};
const getCurrentProject = () => currentProject;
const getAllProjects = () => projects;
const updateStorage = () => {
  localStorage.setItem("projects", JSON.stringify(projects));
};
const fetchData = () => {
  const storedProjects = JSON.parse(localStorage.getItem("projects"));
  if (storedProjects) {
    // Restore instances of projects from JSON
    projects = storedProjects.map(Project.fromJSON);
  }
};

export default {
  addProject,
  getProject,
  deleteProject,
  setCurrentProject,
  getCurrentProject,
  getAllProjects,
  updateStorage,
  fetchData,
};
