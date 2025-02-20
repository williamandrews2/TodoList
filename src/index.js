import "./styles.css";

import createToDo from "./modules/createTodo";
import createProject from "./modules/project";
import projectController from "./modules/projectController";
import ui from "./modules/ui";

// TESTING:
projectController.addProject("Work");
projectController.addProject("Work2");
projectController.addProject("Work3");

const todo1 = createToDo(
  "Go to work",
  "Arrive at work ready to work.",
  "2025-02-26",
  "Medium"
);

const todo2 = createToDo(
  "Go grocery shopping",
  "Purchase milk, eggs, and yogurt.",
  "2025-03-30",
  "High"
);

const todo3 = createToDo(
  "Plan next vacation",
  "Create plans for this next year.",
  "2025-02-19",
  "Low"
);

projectController.getProject("Work").addTodo(todo1);
projectController.getProject("Work").addTodo(todo2);
projectController.getProject("Work").addTodo(todo3);

// END TESTING
document.addEventListener("DOMContentLoaded", () => {
  showDashboard();
});

const dashboardButton = document.getElementById("dashboard-btn");
const projectsButton = document.getElementById("projects-btn");
const addTaskButton = document.getElementById("add-task-btn");

function showDashboard() {
  ui.renderDashboard();
}

function showProjects() {
  ui.renderProjectList();
  console.log(projectController.getAllProjects());
}

function addTask() {
  ui.addTask();
}

dashboardButton.addEventListener("click", showDashboard);
projectsButton.addEventListener("click", showProjects);
addTaskButton.addEventListener("click", addTask);

// TODO: Create and load a default project here.

// TODO: Render the initial UI.
