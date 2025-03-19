import projectController from "./projectController";
import { add, format, isBefore, isAfter } from "date-fns";
import { parseISO } from "date-fns";
import { isSameDay } from "date-fns";
import addNewTask from "./addTask";
import addNewProject from "./addNewProject";

const content = document.querySelector("#content");

const renderProjectList = () => {
  // close the menu if on mobile
  closeNav();

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
    const noTodoMessage = document.createElement("div");
    noTodoMessage.id = "project-no-todos";
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

const getDashboardTodos = (todoType) => {
  const today = getCurrentDate();
  const allProjects = projectController.getAllProjects();
  let dashboardTodos = [];
  allProjects.forEach((project) => {
    const filteredTodos = project.todos.filter((todo) => {
      const todoDate = parseDate(todo.dueDate);

      if (todoType === "today") {
        return isSameDay(todoDate, today); // Check if due today
      }
      if (todoType === "overdue") {
        if (todo.completed) {
          // do not render overdue todos that are already complete
          return false;
        }
        return isBefore(todoDate, today); // Check if overdue
      }
      if (todoType === "upcoming") {
        return isAfter(todoDate, today); // Check if upcoming
      }
    });

    // look into using flatMap instead of forEach and concat...
    dashboardTodos = dashboardTodos.concat(filteredTodos);
  });
  return dashboardTodos;
};

const renderTodoSection = (section, todos) => {
  if (todos.length != 0) {
    // create heading (text filled below)
    const heading = document.createElement("h1");
    heading.className = "dashboard-item-heading";
    if (section === "today") {
      heading.innerText = "Today's todos";
    }
    if (section === "overdue") {
      heading.innerText = "Overdue todos";
    }
    if (section === "upcoming") {
      heading.innerText = "Upcoming todos";
    }

    // create a container and render each todo in the section
    const todoSection = document.createElement("div");
    todoSection.className = "dashboard-todos";
    todos.forEach((todo) => {
      const todoItem = createTodoElement(todo);
      todoSection.appendChild(todoItem);
    });

    content.appendChild(heading);
    content.appendChild(todoSection);
  }
};

const renderDashboard = () => {
  // close the menu if on mobile
  closeNav();

  // clear the page
  content.innerHTML = "";
  createGreeting();

  // quote heading
  const quoteContainer = document.createElement("div");
  quoteContainer.id = "quote-container";
  quoteContainer.innerText = `"What you do today can improve all your tomorrows." - Ralph Marston`;
  content.appendChild(quoteContainer);

  //------------------------BRUTE FORCE DEBUGGING--------------------
  const test1 = document.createElement("div");
  test1.innerText = "Before calling render todo section";
  content.appendChild(test1);
  //------------------------BRUTE FORCE DEBUGGING--------------------

  renderTodoSection("today", getDashboardTodos("today"));

  //------------------------BRUTE FORCE DEBUGGING--------------------
  const test2 = document.createElement("div");
  test2.innerText = "After calling render section";
  content.appendChild(test2);
  //------------------------BRUTE FORCE DEBUGGING--------------------

  renderTodoSection("overdue", getDashboardTodos("overdue"));
  renderTodoSection("upcoming", getDashboardTodos("upcoming"));
};

const addTask = () => {
  // close the menu if on mobile
  closeNav();

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

  // Parsing the due date
  const parsedDate = parseDate(todo.dueDate);

  // add the proper priority styling
  if (todo.priority === "High") {
    todoItem.classList.add("high-priority");
  }

  if (todo.priority === "Medium") {
    todoItem.classList.add("medium-priority");
  }

  if (isBefore(parsedDate, getCurrentDate())) {
    todoItem.classList.add("overdue-todo-item");
  }

  // Checkbox
  const checkboxWrapper = document.createElement("div");
  checkboxWrapper.className = "checkbox-wrapper";

  const check = document.createElement("input");
  check.className = "checkbox";
  check.type = "checkbox";
  check.checked = todo.completed;

  // Apply class on initial render
  if (todo.completed) {
    todoItem.classList.add("todo-complete");
  }

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
  // dueDate.innerText = todo.dueDate
  //   ? format(parsedDate, "MM/dd/yyyy")
  //   : "No due date";
  //---
  try {
    console.log(`Rendering todo with date:`, todo.dueDate);

    const parsedDate = parseDate(todo.dueDate); // Use your parseDate function
    console.log(`Parsed Date:`, parsedDate);

    dueDate.innerText = parsedDate
      ? format(parsedDate, "MM/dd/yyyy")
      : "No due date";
  } catch (error) {
    console.error("Error formatting date:", error);
    dueDate.innerText = "Error formatting date";
  }
  //---
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

const toggleNav = () => {
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("tab-button-container");
  menu.classList.toggle("menu-open");
};

const closeNav = () => {
  const menu = document.getElementById("tab-button-container");
  menu.classList.remove("menu-open");
};

const parseDate = (date) => {
  // Function will return date whether there is one or not!
  const [year, month, day] = date.split("-").map(Number);
  const parsedDate = new Date(year, month - 1, day); // Month is 0-based
  return parsedDate;
};

export default {
  renderProjectList,
  renderProject,
  renderTodos,
  renderDashboard,
  addTask,
  toggleNav,
};
