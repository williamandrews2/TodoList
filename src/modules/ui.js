import projectController from "./projectController";

const content = document.querySelector("#content");

// render project list (used by the "Projects" button)
const renderProjectList = () => {
  content.innerHTML = "";
  createGreeting();
  const projectContainer = document.createElement("div");
  projectContainer.id = "project-container"; // Potential change later.
  content.appendChild(projectContainer);
  const projectList = projectController.getAllProjects();
  projectList.forEach((project) => {
    const projectListItem = document.createElement("button");
    projectListItem.addEventListener("click", () =>
      renderProject(project.name)
    );
    projectListItem.className = "project-list-item";
    projectListItem.innerHTML = project.name;
    projectContainer.appendChild(projectListItem);
  });
};

// render project and its contents
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

// render todos
const renderTodos = () => {
  const project = projectController.getCurrentProject();
  let numTodos = project.todos.length; // number of todos in the current project
  if (numTodos != 0) {
    const todoItemContainer = document.createElement("div");
    todoItemContainer.id = "todo-item-container";
    content.appendChild(todoItemContainer);
    for (let i = 0; i < numTodos; i++) {
      console.log(
        `Task: ${project.todos[i].title}; Description: ${project.todos[i].description}; Due date: ${project.todos[i].dueDate}; Priority: ${project.todos[i].priority}`
      );
      // todo item container
      const todoItem = document.createElement("div");
      todoItem.className = "todo-item";
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
  backButton.innerText = "Back to Projects";
  content.appendChild(backButton);
  backButton.addEventListener("click", () => renderProjectList());
};

export default {
  renderProjectList,
  renderProject,
  renderTodos,
};
