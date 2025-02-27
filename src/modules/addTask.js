import createToDo from "./createTodo";
import projectController from "./projectController";
import ui from "./ui";

function addNewTask(event) {
  event.preventDefault();
  const form = document.getElementById("add-task-form");
  const title = form.title.value;
  const description = form.description.value;
  const dueDate = form.dueDate.value;
  const priority = form.priority.value;
  const completed = false;
  const project = form.project.value;

  // validate the form before processing
  if (title.trim() == "") {
    alert("Title must be filled out!");
    return;
  }
  if (project === "") {
    alert("Please select a project to add your todo to.");
    return;
  }
  // create todo and add it to the project that the user selected
  const todo = createToDo(title, description, dueDate, priority, completed);
  projectController.getProject(project).addTodo(todo);
  ui.renderProject(project);
}

export default addNewTask;
