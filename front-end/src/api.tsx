import ITodo from "./interfaces/ITodo"

class API {
  static verbose = false
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
          API.verbose && console.log(res.error)
        } else {
          API.verbose && console.log(res.message)
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
          API.verbose && console.log(res.error)
        } else {
          API.verbose && console.log(res.message)
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
          API.verbose && console.log(res.error)
        } else {
          API.verbose && console.log(res.message)
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
          API.verbose && console.log(res.error)
        } else {
          API.verbose && console.log(res.message)
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
        API.verbose && console.log("Todo successfuully deleted!")
      }
    })
  }
}

export default API
