import "./styles.css";

import createToDo from "./modules/createTodo";
import createProject from "./modules/project";
import projectController from "./modules/projectController";

const workProject = projectController.addProject("Work");

console.log(projectController.getAllProjects());

// TODO: Create and load a default project here.

// TODO: Render the initial UI.
