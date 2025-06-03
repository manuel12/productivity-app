// @ts-check
import { test, expect } from "@playwright/test"
const {
  deleteTestUsersWithAPI,
  deleteTestTodosWithAPI,
  registerWithAPI,
  loginWithAPI,
  createTodoWithAPI,
} = require("../../utils/utils")

const todoData = require("../../data/todoData.json")
const validTodo = todoData.validData.singleTodo
const invalidTodo = todoData.invalidData

test.describe("READ Todo - (GET) /api/todo/", () => {
  const apiUrl = "http://localhost:4000"
  let token
  let ctx = {}

  test.beforeAll(async ({ request }) => {
    await deleteTestUsersWithAPI(request)

    await registerWithAPI(request)
    await loginWithAPI(request).then(async (response) => {
      const responseBody = await response.json()
      token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(
        request,
        token,
        validTodo.description,
        validTodo.completed
      ).then(async (response) => {
        const responseBody = await response.json()
        ctx.todoId = responseBody.id
      })
    })
  })

  test("should retrieve all existing todos", async ({ request }) => {
    const response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const responseBody = await response.json()
    await expect(responseBody.message).toEqual("Todos successfully retrieved!")
    await expect(responseBody.data.length).toBeGreaterThan(0)
  })

  test("should retrieve a specific todo", async ({ request }) => {
    const response = await request.get(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const responseBody = await response.json()
    await expect(responseBody.message).toEqual("Todo successfully retrieved!")
  })

  test("should have completed and description properties on returned todos", async ({
    request,
  }) => {
    const response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const responseBody = await response.json()
    await expect(responseBody.message).toEqual("Todos successfully retrieved!")
    const todos = responseBody.data
    todos.forEach(async (todo) => {
      await expect(todo).toHaveProperty("completed")
      await expect(todo).toHaveProperty("description")
    })
  })

  test("should have the correct type on returned todos", async ({
    request,
  }) => {
    const response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const responseBody = await response.json()
    const todos = responseBody.data
    todos.forEach(async (todo) => {
      await expect(typeof todo.completed).toBe("boolean")
      await expect(typeof todo.description).toBe("string")
    })
  })

  test("should NOT retrieve a todo when requesting with invalid id", async ({
    request,
  }) => {
    const response = await request.get(
      `${apiUrl}/api/todo/${invalidTodo.invalidId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const responseBody = await response.json()
    await expect(responseBody.message).toEqual(
      `Todo with id ${invalidTodo.invalidId} not found.`
    )
  })

  test("should not retrieve a todo with invalid token", async ({ request }) => {
    const response = await request.get(`${apiUrl}/api/todos/`)
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual("Unauthorized: No token provided.")
  })
})
