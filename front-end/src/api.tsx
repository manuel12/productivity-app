import ITodo from "./interfaces/ITodo"

class API {
  static getTodos(setTodos: any): void {
    fetch("http://localhost:4000/api/todos", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.warn(res.error)
        } else {
          console.warn(res.message)
          setTodos(res.data)
        }
      })
  }

  static getTodo(id: number): void {
    fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.warn(res.error)
        } else {
          console.warn(res.message)
        }
      })
  }

  static addTodo(todoData: ITodo, addNewTodo: any): void {
    fetch("http://localhost:4000/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.warn(res.error)
        } else {
          console.warn(res.message)
          addNewTodo(res.data)
        }
      })
  }

  static editTodo(todoData: ITodo, id: number): void {
    fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoData),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.warn(res.error)
        } else {
          console.warn(res.message)
        }
      })
  }

  static deleteTodo(id: number): void {
    fetch(`http://localhost:4000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 204) {
        console.warn("Todo successfuully deleted!")
      }
    })
  }
}

export default API
