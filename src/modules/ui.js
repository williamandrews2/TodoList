import projectController from "./projectController";

const content = document.querySelector("#content");

// render project list
const renderProjectList = () => {
  content.innerHTML = "";
  createGreeting();
  const projectContainer = document.createElement("div");
  projectContainer.id = "project-container"; // Potential change later.
  content.appendChild(projectContainer);
  const projectList = projectController.getAllProjects();
  projectList.forEach((project) => {
    const projectListItem = document.createElement("div"); // Might need to change to buttons...
    projectListItem.className = "project-list-item";
    projectListItem.innerHTML = project.name;
    projectContainer.appendChild(projectListItem);
    console.log(project.name);
  });
};

// render project and its contents
const renderProject = () => {};

// render todos
const renderTodos = () => {};

// greet the user
const createGreeting = () => {
  const greeting = document.createElement("h1");
  greeting.id = "greeting";
  greeting.innerText = "Hello";
  content.appendChild(greeting);
};

export default {
  renderProjectList,
  renderProject,
  renderTodos,
};
