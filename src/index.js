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
  "02/10/2025",
  "Medium"
);

const todo2 = createToDo(
  "Go grocery shopping",
  "Purchase milk, eggs, and yogurt.",
  "02/15/2025",
  "Medium"
);

const todo3 = createToDo(
  "Plan next vacation",
  "Create plans for this next year.",
  "07/23/2025",
  "Low"
);

// Todos must be added like this for now since we do not have access to direct variable
projectController.getProject("Work").addTodo(todo1);
projectController.getProject("Work").addTodo(todo2);
projectController.getProject("Work").addTodo(todo3);

// END TESTING

const dashboardButton = document.getElementById("dashboard-btn");
const projectsButton = document.getElementById("projects-btn");
const addTaskButton = document.getElementById("add-task-btn");

function showDashboard() {}

function showProjects() {
  ui.renderProjectList();
}

function addTask() {}

dashboardButton.addEventListener("click", showDashboard);
projectsButton.addEventListener("click", showProjects);
addTaskButton.addEventListener("click", addTask);

// TODO: Create and load a default project here.

// TODO: Render the initial UI.
