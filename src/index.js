import "./styles.css";

import createToDo from "./modules/createTodo";
import createProject from "./modules/project";
import projectController from "./modules/projectController";

// const todo = createToDo("task1", "go to grocery store", "01/31/2025", "high");

const myProject = createProject("Work");

const newTodo = createToDo(
  "Go shopping",
  "Hit up Sprouts and Target",
  "Tomorrow at 1PM",
  "High"
);

myProject.addTodo(newTodo);
console.log(newTodo);
console.log(myProject.todos);

// TODO: Create and load a default project here.

// TODO: Render the initial UI.
