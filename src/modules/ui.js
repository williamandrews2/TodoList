import projectController from "./projectController";
import { format } from "date-fns";
import { parseISO } from "date-fns";
import { isSameDay } from "date-fns";
import addNewTask from "./addTask";
import addNewProject from "./addProject";

const content = document.querySelector("#content");

const renderProjectList = () => {
  content.innerHTML = "";
  createGreeting();
  const projectContainer = document.createElement("div");
  projectContainer.id = "project-container";
  content.appendChild(projectContainer);
  const projectList = projectController.getAllProjects();
  projectList.forEach((project) => {
    const projectListItem = document.createElement("button");
    projectListItem.className = "project-list-buttons";
    projectListItem.addEventListener("click", () =>
      renderProject(project.name)
    );
    projectListItem.className = "project-list-item";
    projectListItem.innerHTML = `${project.name} (${project.todos.length} items)`;
    projectContainer.appendChild(projectListItem);
  });
  const addProjectButton = document.createElement("button");
  addProjectButton.id = "add-project-button";
  addProjectButton.innerText = "Add new project";
  addProjectButton.addEventListener("click", addProject);
  projectContainer.appendChild(addProjectButton);
};

const renderProject = (name) => {
  projectController.setCurrentProject(name);
  content.innerHTML = "";
  showBackButton();
  // show the title of the project
  const projectName = document.createElement("h1");
  projectName.innerText = name;
  content.appendChild(projectName);
  // show project attributes
  renderTodos();
};

const renderTodos = () => {
  const project = projectController.getCurrentProject();
  let numTodos = project.todos.length; // number of todos in the current project
  if (numTodos != 0) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.id = "todo-item-container";
    content.appendChild(todoItemContainer);
    for (let i = 0; i < numTodos; i++) {
      // todo item container
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";
      // checkbox
      const check = document.createElement("input");
      check.type = "checkbox";
      check.addEventListener("change", function () {
        todoItem.classList.toggle("todo-complete", check.checked);
        project.todos[i].completed = check.checked;
      });
      todoItem.appendChild(check);
      // title
      const title = document.createElement("h2");
      title.innerText = `${project.todos[i].title}`;
      todoItem.appendChild(title);
      // description
      const description = document.createElement("h4");
      description.innerText = `${project.todos[i].description}`;
      todoItem.appendChild(description);
      // due date
      const dueDate = document.createElement("h4");
      dueDate.innerText = `Due: ${project.todos[i].dueDate}`;
      todoItem.appendChild(dueDate);
      // priority
      const priority = document.createElement("h4");
      priority.innerText = `Priority: ${project.todos[i].priority}`;
      todoItem.appendChild(priority);
      // check if the task is already complete
      if (project.todos[i].completed) {
        todoItem.classList.add("todo-complete");
        check.checked = true;
      }
      // append to container
      todoItemContainer.appendChild(todoItem);
    }
  } else {
    const noTodoMessage = document.createElement("h3");
    noTodoMessage.innerText = "No todos yet!";
    // add link/button here to create the user's first todo.
    content.appendChild(noTodoMessage);
  }
};

// greet the user
const createGreeting = () => {
  const greeting = document.createElement("h1");
  greeting.id = "greeting";
  greeting.innerText = "Hello";
  content.appendChild(greeting);
};

const showBackButton = () => {
  // This function returns to project page only. No
  // functionality for returning to another page yet.
  const backButton = document.createElement("button");
  backButton.className = "button-style-1";
  backButton.innerText = "Back to Projects";
  content.appendChild(backButton);
  backButton.addEventListener("click", () => renderProjectList());
};

const getCurrentDate = () => {
  return format(new Date(), "MM-dd-yyyy"); // Formats today's date as MM-DD-YYYY
};

const getTodosToday = () => {
  const allProjects = projectController.getAllProjects();
  const today = getCurrentDate();
  let dueTodayTodos = [];
  allProjects.forEach((project) => {
    const filteredTodos = project.todos.filter((todo) => {
      const todoDate = parseISO(todo.dueDate);
      return isSameDay(todoDate, today); // Check if due today
    });

    dueTodayTodos = dueTodayTodos.concat(filteredTodos);
  });
  return dueTodayTodos;
};

const renderDashboard = () => {
  content.innerHTML = "";
  createGreeting();
  // create a random quote selector here.
  const quoteContainer = document.createElement("div");
  quoteContainer.id = "quote-container";
  quoteContainer.innerText = `"What you do today can improve all your tomorrows." - Ralph Marston`;
  content.appendChild(quoteContainer);
  const today = document.createElement("h2");
  today.innerText = "Today's tasks";
  content.appendChild(today);

  const dueTodayTodos = getTodosToday();
  if (dueTodayTodos.length === 0) {
    const noTodosToday = document.createElement("div");
    noTodosToday.innerText = "No tasks due today!";
    content.appendChild(noTodosToday);
  } else {
    const todoList = document.createElement("ul");
    dueTodayTodos.forEach((todo) => {
      const todoItem = document.createElement("li");
      todoItem.innerText = `${todo.title} - ${todo.description}`;
      todoList.appendChild(todoItem);
    });
    content.appendChild(todoList);
  }
};

const addTask = () => {
  content.innerHTML = "";
  const template = document.getElementById("add-task-template");
  const addTaskForm = template.content.cloneNode(true);
  content.appendChild(addTaskForm);
  const form = document.getElementById("add-task-form");
  populateDropdown();
  form.addEventListener("submit", addNewTask);
};

const populateDropdown = () => {
  const projectSelect = document.getElementById("project-select");
  projectSelect.innerHTML = "";
  const projects = projectController.getAllProjects();
  projects.forEach((project) => {
    const option = document.createElement("option");
    option.value = project.name;
    option.textContent = project.name;
    projectSelect.appendChild(option);
  });
};

const addProject = () => {
  content.innerHTML = "";
  const template = document.getElementById("add-project-template");
  const addProjectForm = template.content.cloneNode(true);
  content.appendChild(addProjectForm);
  const form = document.getElementById("add-project-form");
  form.addEventListener("submit", addNewProject);
};

export default {
  renderProjectList,
  renderProject,
  renderTodos,
  renderDashboard,
  addTask,
};
