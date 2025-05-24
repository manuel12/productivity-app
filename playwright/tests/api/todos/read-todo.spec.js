// @ts-check
import { test, expect } from "@playwright/test"
const {
  deleteTestUsers,
  deleteTestTodos,
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
  test.beforeAll(async ({ request }) => {
    await deleteTestUsers(request)

    await registerWithAPI(request)
    await loginWithAPI(request).then(async (response) => {
      const responseBody = await response.json()
      token = responseBody.token
      await deleteTestTodos(request, token)
      await createTodoWithAPI(
        request,
        token,
        validTodo.description,
        validTodo.completed
      )
    })
  })

  test.only("should retrieve all existing todos", async ({ request }) => {
    const response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    const responseBody = await response.json()
    expect(responseBody.message).toEqual("Todos successfully retrieved!")
    expect(responseBody.data.length).toBeGreaterThan(0)
  })
})
