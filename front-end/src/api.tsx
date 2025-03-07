import axios from "axios"

import {
  ILoginUser,
  ILoginSuccessResponse,
  ILoginErrorResponse,
  IRegisterSuccessResponse,
  IRegisterErrorResponse,
  ITodo,
  IDaily,
} from "../src/interfaces/interfaces"
import { getItem } from "./utils"

class API {
  static verbose = true
  static getToken = () => {
    const token = getItem("token")
    return token
  }

  static login(
    userCredentials: ILoginUser,
    error: (res: ILoginErrorResponse) => void,
    success: (res: ILoginSuccessResponse) => void
  ) {
    return axios
      .post("http://localhost:4000/api/login", userCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        success(res.data)
      })
      .catch((err) => {
        console.error("There was an error!", err)
        error(err)
      })
  }

  static register(
    newUserCredentials: ILoginUser,
    error: (res: IRegisterErrorResponse) => void,
    success: (res: IRegisterSuccessResponse) => void
  ) {
    return axios
      .post("http://localhost:4000/api/user", newUserCredentials, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        success(res.data)
      })
      .catch((err) => {
        console.error("There was an error!", err) // Handle request errors
        error(err)
      })
  }

  static getTodos(setTodos: (data: ITodo[]) => void) {
    return axios
      .get("http://localhost:4000/api/todos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API.getToken()}`, // Add the authorization token
        },
      })
      .then((response) => {
        if (response.data.error) {
          if (API.verbose) console.log(response.data.error) // Log error if verbose is enabled
        } else {
          if (API.verbose) console.log(response.data.message) // Log message if verbose is enabled
          setTodos(response.data.data) // Update todos with the response data
        }
      })
      .catch((err) => {
        console.error("There was an error!", err) // Handle request errors
      })
  }

  static getUserTodos(setTodos: (data: ITodo[]) => void) {
    return axios
      .get("http://localhost:4000/api/todos/user", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API.getToken()}`, // Add the authorization token
        },
      })
      .then((response) => {
        if (response.data.error) {
          if (API.verbose) console.log(response.data.error) // Log error if verbose is enabled
        } else {
          if (API.verbose) console.log(response.data.message) // Log message if verbose is enabled
          console.log(response.data.data)
          setTodos(response.data.data) // Update todos with the response data
        }
      })
      .catch((err) => {
        console.error("There was an error!", err) // Handle request errors
      })
  }

  static getTodo(id: number) {
    return axios
      .get(`http://localhost:4000/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`, // Add the authorization token
        },
      })
      .then((response) => {
        if (response.data.error) {
          if (API.verbose) console.log(response.data.error) // Log error if verbose is enabled
        } else {
          if (API.verbose) console.log(response.data.message) // Log message if verbose is enabled
        }
      })
      .catch((err) => {
        console.error("There was an error!", err) // Handle request errors
      })
  }

  static addTodo(todoData: ITodo, addNewTodo: (data: ITodo) => void) {
    return axios
      .post("http://localhost:4000/api/todo", todoData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`, // Add the authorization token
        },
      })
      .then((response) => {
        if (response.data.error) {
          if (API.verbose) console.log(response.data.error) // Log error if verbose is enabled
        } else {
          if (API.verbose) console.log(response.data.message) // Log message if verbose is enabled
          // addNewTodo(response.data); // Uncomment this line to add the new todo
        }
      })
      .catch((err) => {
        console.error("There was an error!", err) // Handle request errors
      })
  }

  static editTodo(todoData: ITodo, id: number) {
    return axios
      .patch(`http://localhost:4000/api/todo/${id}`, todoData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          API.verbose && console.log(response.data.error)
        } else {
          API.verbose && console.log(response.data.message)
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static deleteTodo(id: number) {
    return axios
      .delete(`http://localhost:4000/api/todo/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          API.verbose && console.log("Todo successfully deleted!")
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static getDailies(setDailies: (data: IDaily[]) => void) {
    axios
      .get("http://localhost:4000/api/dailies", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          API.verbose && console.log(response.data.error)
        } else {
          API.verbose && console.log(response.data.message)
          setDailies(response.data.data)
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static getDaily(id: number) {
    axios
      .get(`http://localhost:4000/api/dailies/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          API.verbose && console.log(response.data.error)
        } else {
          API.verbose && console.log(response.data.message)
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static addDaily(dailyData: IDaily, addNewDaily: (data: IDaily) => void) {
    axios
      .post("http://localhost:4000/api/dailies", dailyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          API.verbose && console.log(response.data.error)
        } else {
          API.verbose && console.log(response.data.message)
          addNewDaily(response.data.data)
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static editDaily(dailyData: IDaily, id: number) {
    axios
      .patch(`http://localhost:4000/api/dailies/${id}`, dailyData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.data.error) {
          API.verbose && console.log(response.data.error)
        } else {
          API.verbose && console.log(response.data.message)
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }

  static deleteDaily(id: number) {
    axios
      .delete(`http://localhost:4000/api/dailies/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.getToken()}`,
        },
      })
      .then((response) => {
        if (response.status === 204) {
          API.verbose && console.log("Daily successfully deleted!")
        }
      })
      .catch((err) => {
        console.error("There was an error!", err)
      })
  }
}

export default API
