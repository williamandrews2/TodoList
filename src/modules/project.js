const createProject = (name) => {
  return {
    name, // The project's name.
    todos: [], // Array to store todo objects.
    addTodo(todo) {
      this.todos.push(todo);
    },
    removeTodo(index) {
      if (index >= 0 && index < this.todos.length) {
        this.todos.splice(index, 1);
      }
    },
  };
};

export default createProject;
