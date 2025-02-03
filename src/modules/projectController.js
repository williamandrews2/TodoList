import createProject from "./project";

const projects = []; // Store all projects here.
let currentProject = null; // Track the currently active project.

const addProject = (name) => {
  if (!projects.some((project) => project.name === name)) {
    const newProject = createProject(name);
    projects.push(newProject);

    if (!currentProject) {
      currentProject = newProject;
    }
  }
};

const getProject = (name) => projects.find((project) => project.name === name);
const deleteProject = (name) => {
  projects = projects.filter((project) => project.name !== name);
  if (currentProject && currentProject.name === name) {
    currentProject = projects.length > 0 ? projects[0] : null;
  }
};
const setCurrentProject = (name) => {
  const project = getProject(name);
  if (project) currentProject = project;
};
const getCurrentProject = () => currentProject;
const getAllProjects = () => projects;

export default {
  addProject,
  getProject,
  deleteProject,
  setCurrentProject,
  getCurrentProject,
  getAllProjects,
};
