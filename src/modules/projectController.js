import createProject from "./project";

const projectController = () => {
  let projects = []; // Store all the projects here.
  let currentProject = null;

  const addProject = (name) => {
    const newProject = createProject(name);
    projects.push(newProject);

    // Set to current project if this is the first project being created.
    if (!currentProject) {
      currentProject = newProject;
    }

    return newProject;
  };

  // Find a project by name:
  const getProject = (name) => {
    return projects.find((project) => project.name === name);
  };

  // Delete a project by name:
  const deleteProject = (name) => {
    // Update the array of projects:
    projects = projects.filter((project) => project.name !== name);

    // Set the another project to be the current project if the
    // current project was the one that was deleted.
    if (currentProject && currentProject.name === name) {
      currentProject = projects.length > 0 ? projects[0] : null;
    }
  };

  const setCurrentProject = (name) => {
    const project = getProject(name);
    if (project) {
      currentProject = project;
    }
  };

  const getCurrentProject = () => {
    return currentProject;
  };

  const getAllProjects = () => {
    return projects;
  };
};

export default projectController;
