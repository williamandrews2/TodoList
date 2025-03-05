import projectController from "./projectController";
import { add, format } from "date-fns";
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
  projectName.innerText = name;
  content.appendChild(projectName);
  // show project todos
  renderTodos();
  // delete button
  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete project";
  deleteButton.addEventListener("click", () => {
    projectController.deleteProject(name);
  });
  content.appendChild(deleteButton);
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
        projectController.updateStorage();
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
      // delete button
      const deleteButton = document.createElement("button");
      deleteButton.innerText = "X";
      deleteButton.addEventListener("click", function () {
        project.removeTodo(i);
        // clear page content and reload todos
        renderProject(project.name);
      });
      todoItem.appendChild(deleteButton);
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
  greeting.innerText = "Hello!";
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
  today.id = "todays-tasks-heading";
  today.innerText = "Today's tasks";
  content.appendChild(today);

  const dueTodayTodos = getTodosToday();
  if (dueTodayTodos.length === 0) {
    const noTodosToday = document.createElement("div");
    noTodosToday.id = "todays-todos";
    noTodosToday.innerText = "No tasks due today!";
    content.appendChild(noTodosToday);
  } else {
    // create container for today's todos
    const todaysTodos = document.createElement("div");
    todaysTodos.id = "todays-todos";

    // render each todo in the container
    dueTodayTodos.forEach((todo) => {
      // container div for single todo item
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";

      // checkbox with event listener
      const check = document.createElement("input");
      check.type = "checkbox";
      check.addEventListener("change", function () {
        todoItem.classList.toggle("todo-complete", check.checked);
        todo.completed = check.checked;
        projectController.updateStorage();
      });
      todoItem.appendChild(check);

      // todo title and description
      const text = document.createElement("div");
      text.innerText = `${todo.title} - ${todo.description}`;
      todoItem.appendChild(text);

      // check if a todo has already been completed
      if (todo.completed) {
        todoItem.classList.add("todo-complete");
        check.checked = true;
      }

      todaysTodos.appendChild(todoItem);
    });
    content.appendChild(todaysTodos);
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
