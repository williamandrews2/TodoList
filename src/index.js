import "./styles.css";

import createToDo from "./modules/createTodo";
import projectController from "./modules/projectController";
import ui from "./modules/ui";

// TESTING:
// const workProject = projectController.addProject("Work");
// const workProject2 = projectController.addProject("Work2");
// const workProject3 = projectController.addProject("Work3");

const dashboardButton = document.getElementById("dashboard-btn");

function showDashboard() {
  ui.renderProjectList();
  console.log("Showing dashboard and project list!");
}

function showProjects() {}

function addTask() {}

dashboardButton.addEventListener("click", showDashboard);

// TODO: Create and load a default project here.

// TODO: Render the initial UI.
