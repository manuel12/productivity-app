import ITodo from "./interfaces/ITodo"
import IDaily from "./interfaces/IDaily"

class API {
  static verbose = true

  static login(userCredentials: any, error: any, success: any) {
    // Call /api/login with userData
    fetch("http://localhost:4000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userCredentials),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error(res)
        } else {
          success(res)
        }
      })
  }

  static register(newUserCredentials: any, error: any, success: any) {
    fetch("http://localhost:4000/api/user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUserCredentials),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          error(res)
        } else {
          success(res)
        }
      })
  }

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

  static getDailies(setDailies: any): void {
    fetch("http://localhost:4000/api/dailies", {
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
          setDailies(res.data)
        }
      })
  }

  static getDaily(id: number): void {
    fetch(`http://localhost:4000/api/dailies/${id}`, {
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

  static addDaily(todoData: IDaily, addNewDaily: any): void {
    fetch("http://localhost:4000/api/dailies", {
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
          addNewDaily(res.data)
        }
      })
  }

  static editDaily(dailyData: IDaily, id: number): void {
    fetch(`http://localhost:4000/api/dailies/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dailyData),
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

  static deleteDaily(id: number): void {
    fetch(`http://localhost:4000/api/dailies/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 204) {
        API.verbose && console.log("Daily successfuully deleted!")
      }
    })
  }
}

export default API
