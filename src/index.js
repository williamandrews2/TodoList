import "./styles.css";
import "./variables.css";
import "./checkbox.css";

import projectController from "./modules/projectController";
import ui from "./modules/ui";
import createSampleProject from "./modules/sample";

const dashboardButton = document.getElementById("dashboard-btn");
const projectsButton = document.getElementById("projects-btn");
const addTaskButton = document.getElementById("add-task-btn");
const hamburger = document.getElementById("hamburger");

dashboardButton.addEventListener("click", showDashboard);
projectsButton.addEventListener("click", showProjects);
addTaskButton.addEventListener("click", addTask);
hamburger.addEventListener("click", () => {
  ui.toggleNav();
});

function showDashboard() {
  ui.renderDashboard();
}

function showProjects() {
  ui.renderProjectList();
}

function addTask() {
  ui.addTask();
}

document.addEventListener("DOMContentLoaded", () => {
  projectController.fetchData();
  showDashboard();
});

document.addEventListener("click", (event) => {
  const menu = document.getElementById("tab-button-container");
  const hamburger = document.getElementById("hamburger");

  // check if the click is outside the menu and the hamburger button
  if (!menu.contains(event.target) && !hamburger.contains(event.target)) {
    menu.classList.remove("menu-open");
  }
});
