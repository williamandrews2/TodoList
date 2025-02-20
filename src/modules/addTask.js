import createToDo from "./createTodo";
import projectController from "./projectController";

function addNewTask(event) {
  event.preventDefault();
  const form = document.getElementById("add-task-form");
  const title = form.title.value;
  const description = form.description.value;
  const dueDate = form.dueDate.value;
  const priority = form.priority.value;
  const project = form.project.value;

  // create todo and add it to the project that the user selected
  const todo = createToDo(title, description, dueDate, priority);
  projectController.getProject(project).addTodo(todo);
}

export default addNewTask;
