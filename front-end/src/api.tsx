import ITodo from "./interfaces/ITodo"
import IDaily from "./interfaces/IDaily"
import { getItem } from "./utils"

class API {
  static verbose = true
  static getToken = () => {
    const token = getItem("token")
    return token
  }

  static login(userCredentials: any, error: any, success: any) {
    console.log(userCredentials)
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
        Authorization: `Bearer ${API.getToken()}`,
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
    fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
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
    console.log(todoData)
    console.log(addNewTodo)

    fetch("http://localhost:4000/api/todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
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
    fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
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
    fetch(`http://localhost:4000/api/todo/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.getToken()}`,
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
        Authorization: `Bearer ${this.getToken()}`,
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
        Authorization: `Bearer ${this.getToken()}`,
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
        Authorization: `Bearer ${this.getToken()}`,
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
        Authorization: `Bearer ${this.getToken()}`,
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
        Authorization: `Bearer ${this.getToken()}`,
      },
    }).then((res) => {
      if (res.status === 204) {
        API.verbose && console.log("Daily successfuully deleted!")
      }
    })
  }
}

export default API
