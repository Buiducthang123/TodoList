import { defineStore } from "pinia";

export const usetodosStore = defineStore("todos", {
  state: () => ({
    todos: [],
    isDz: true,
  }),
  getters: {
    getTodoList(state) {
      return state.todos;
    },
  },
  actions: {
    async fetchAPI() {
      const res = await fetch("http://127.0.0.1:8000/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json", // Bổ sung header
          // Các headers khác nếu cần
        },
        // Bổ sung body nếu cần (ví dụ: POST, PUT)
        body: JSON.stringify(),
      });
      if (res.ok) {
        const data = await res.json();
        let b = [];
        data.todos.forEach((element) => {
          b.push(element);
        });
        this.setTodos(b); // Sử dụng phương thức setTodos để cập nhật mảng todos
      }
    },
    async deleteTodo(id) {
      const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();
        this.removeTodo(id); // Sử dụng phương thức removeTodo để xóa nhiệm vụ khỏi mảng todos
      }
    },
    async addTodo(name) {
      try {
        const res = await fetch("http://127.0.0.1:8000/api/todos", {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
          }),
        });

        if (res.ok) {
          const data = await res.json();
        
        } else {
          console.error("Failed to add todo:", res.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },
    async updateTodo(name,id,status=false) {
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/todos/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify({
            name: name,
            status:status
          }),
        });

        if (res.ok) {
          const data = await res.json();
         
        } else {
          console.error("Failed to add todo:", res.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    },

    setTodos(todos) {
      this.todos = todos;
    },
    removeTodo(id) {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
  },
});
