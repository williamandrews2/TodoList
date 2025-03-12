import projectController from "./projectController";
import { add, format, isBefore } from "date-fns";
import { parseISO } from "date-fns";
import { isSameDay } from "date-fns";
import addNewTask from "./addTask";
import addNewProject from "./addNewProject";

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
    projectListItem.innerHTML = `${project.name} (${project.todos.length})`;
    projectContainer.appendChild(projectListItem);
  });
  const addProjectButton = document.createElement("button");
  addProjectButton.id = "new-project-button";
  addProjectButton.innerText = "+ Add new project";
  addProjectButton.addEventListener("click", addProject);
  projectContainer.appendChild(addProjectButton);
};

const renderProject = (name) => {
  projectController.setCurrentProject(name);
  content.innerHTML = "";
  showBackButton();
  // show the title of the project
  const projectName = document.createElement("h1");
  projectName.id = "project-name";
  projectName.innerText = name;
  content.appendChild(projectName);
  // show project todos
  renderTodos();
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.id = "delete-project-button";
  deleteButton.innerText = "Delete project";
  deleteButton.addEventListener("click", () => {
    projectController.deleteProject(name);
  });
  content.appendChild(deleteButton);
};

const renderTodos = () => {
  const project = projectController.getCurrentProject();

  if (project.todos.length > 0) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.id = "todo-item-container";
    content.appendChild(todoItemContainer);

    project.todos.forEach((todo, index) => {
      todoItemContainer.appendChild(createTodoElement(todo, index, project));
    });
  } else {
    const noTodoMessage = document.createElement("h3");
    noTodoMessage.innerText = "No todos yet!";
    content.appendChild(noTodoMessage);
  }
};

// greet the user
const createGreeting = () => {
  const greeting = document.createElement("h1");
  greeting.id = "greeting";
  greeting.innerText = "Hello!";
  content.appendChild(greeting);
};

const showBackButton = () => {
  // This function returns to project page only. No
  // functionality for returning to another page yet.
  const backButton = document.createElement("button");
  backButton.className = "back-button";
  backButton.innerText = "< Back to Projects";
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

const getTodosOverdue = () => {
  const today = getCurrentDate();
  const allProjects = projectController.getAllProjects();
  let overdueTodos = [];
  allProjects.forEach((project) => {
    const filteredTodos = project.todos.filter((todo) => {
      const todoDate = parseISO(todo.dueDate);
      return isBefore(todoDate, today); // Check if overdue
    });

    overdueTodos = overdueTodos.concat(filteredTodos);
  });
  return overdueTodos;
};

const renderDashboard = () => {
  content.innerHTML = "";
  createGreeting();

  // quote
  const quoteContainer = document.createElement("div");
  quoteContainer.id = "quote-container";
  quoteContainer.innerText = `"What you do today can improve all your tomorrows." - Ralph Marston`;
  content.appendChild(quoteContainer);

  // today's tasks
  const today = document.createElement("h1");
  today.className = "dashboard-item-heading";
  today.innerText = "Today's tasks";
  content.appendChild(today);

  const dueTodayTodos = getTodosToday();

  if (dueTodayTodos.length === 0) {
    const noTodosToday = document.createElement("h3");
    noTodosToday.className = "dashboard-todos";
    noTodosToday.innerText = "No tasks due today!";
    content.appendChild(noTodosToday);
  } else {
    // create container for today's todos
    const todaysTodos = document.createElement("div");
    todaysTodos.className = "dashboard-todos";

    // render each todo in the container
    dueTodayTodos.forEach((todo) => {
      todaysTodos.appendChild(createTodoElement(todo));
    });

    content.appendChild(todaysTodos);
  }

  // overdue todos
  const overdue = document.createElement("h1");
  overdue.className = "dashboard-item-heading";
  overdue.innerText = "Overdue tasks";
  content.appendChild(overdue);

  const overdueTodos = getTodosOverdue();

  if (overdueTodos.length === 0) {
    const noOverdueTodos = document.createElement("div");
    noOverdueTodos.className = "dashboard-todos";
    noOverdueTodos.innerText = "No tasks due today!";
    content.appendChild(noOverdueTodos);
  } else {
    // create container for today's todos
    const overdueTodoContainer = document.createElement("div");
    overdueTodoContainer.className = "dashboard-todos";

    // render each todo in the container
    overdueTodos.forEach((todo) => {
      const todoItem = createTodoElement(todo);
      todoItem.classList.add("overdue-todo-item");
      overdueTodoContainer.appendChild(todoItem);
    });

    content.appendChild(overdueTodoContainer);
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

const createTodoElement = (todo, index, project = null) => {
  // Todo item container
  const todoItem = document.createElement("div");
  todoItem.classList.add("todo-item");

  // Checkbox
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "checkbox-wrapper";

  const check = document.createElement("input");
  check.className = "checkbox";
  check.type = "checkbox";
  check.checked = todo.completed;
  check.addEventListener("change", function () {
    todoItem.classList.toggle("todo-complete", check.checked);
    todo.completed = check.checked;
    projectController.updateStorage();
  });

  // Generate a unique ID for the checkbox
  const uniqueId = `checkbox-${Math.random().toString(36).substr(2, 9)}`;
  check.id = uniqueId;

  const checkboxLabel = document.createElement("label");
  checkboxLabel.setAttribute("for", uniqueId);

  const tickMark = document.createElement("div");
  tickMark.className = "tick-mark";
  checkboxLabel.appendChild(tickMark);

  checkboxWrapper.appendChild(check);
  checkboxWrapper.appendChild(checkboxLabel);

  todoItem.appendChild(checkboxWrapper);

  // Todo Contents
  const todoContents = document.createElement("div");
  todoContents.className = "todo-contents";

  const mainTodoContents = document.createElement("div");
  mainTodoContents.className = "main-todo-contents";
  mainTodoContents.addEventListener("click", function () {
    const expand = this.nextElementSibling;
    expand.classList.toggle("hidden");
  });

  const secondaryTodoContents = document.createElement("div");
  secondaryTodoContents.className = "secondary-todo-contents hidden";

  // Title
  const title = document.createElement("h2");
  title.innerText = todo.title;
  mainTodoContents.appendChild(title);

  // Due Date
  const dueDate = document.createElement("h4");
  dueDate.innerText = todo.dueDate
    ? format(todo.dueDate, "MM/dd/yyyy")
    : "No due date";
  mainTodoContents.appendChild(dueDate);

  // Description
  const description = document.createElement("h4");
  description.innerText = todo.description;
  secondaryTodoContents.appendChild(description);

  // Priority
  const priority = document.createElement("h4");
  priority.innerText = `${todo.priority} priority`;
  secondaryTodoContents.appendChild(priority);

  // Append all contents
  todoContents.appendChild(mainTodoContents);
  todoContents.appendChild(secondaryTodoContents);
  todoItem.appendChild(todoContents);

  // Delete Button (Only when viewing a project, not the dashboard)
  if (project) {
    const deleteButton = document.createElement("button");

    // Trash can icon SVG
    const trashIcon = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "svg"
    );
    trashIcon.setAttribute("width", "24");
    trashIcon.setAttribute("height", "24");
    trashIcon.setAttribute("viewBox", "0 0 24 24");
    trashIcon.setAttribute("fill", "none");
    trashIcon.setAttribute("stroke", "currentColor");
    trashIcon.setAttribute("stroke-width", "2");
    trashIcon.setAttribute("stroke-linecap", "round");
    trashIcon.setAttribute("stroke-linejoin", "round");

    // Create SVG paths
    const polyline = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "polyline"
    );
    polyline.setAttribute("points", "3 6 5 6 21 6");

    const path1 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path1.setAttribute(
      "d",
      "M19 6L17.5 21.5C17.4 22.3 16.7 23 15.8 23H8.2C7.3 23 6.6 22.3 6.5 21.5L5 6M10 11V17M14 11V17"
    );

    const path2 = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    path2.setAttribute("d", "M8 6V3H16V6");

    // Append paths to SVG
    trashIcon.appendChild(polyline);
    trashIcon.appendChild(path1);
    trashIcon.appendChild(path2);

    deleteButton.appendChild(trashIcon);

    deleteButton.className = "delete-button";
    deleteButton.addEventListener("click", function () {
      project.removeTodo(index);
      renderProject(project.name);
    });
    todoItem.appendChild(deleteButton);
  }

  return todoItem;
};

export default {
  renderProjectList,
  renderProject,
  renderTodos,
  renderDashboard,
  addTask,
};
