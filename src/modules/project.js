import projectController from "./projectController";

class Project {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
    projectController.updateStorage();
  }

  removeTodo(index) {
    if (index >= 0 && index < this.todos.length) {
      this.todos.splice(index, 1);
    }
    projectController.updateStorage();
  }

  // ✅ Method to reconstruct project from JSON
  static fromJSON(data) {
    const project = new Project(data.name);
    project.todos = data.todos || [];
    return project;
  }
}

export default Project;
