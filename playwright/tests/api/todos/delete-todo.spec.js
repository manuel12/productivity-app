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

test.describe("DELETE Todo - (DELETE) /api/todo/:id", () => {
  const apiUrl = "http://localhost:4000"
  let token
  let ctx = {}

  test.beforeAll(async ({ request }) => {
    await deleteTestUsersWithAPI(request)

    await registerWithAPI(request)
    await loginWithAPI(request).then(async (response) => {
      const responseBody = await response.json()
      token = responseBody.token
      await deleteTestTodosWithAPI(request, token)
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

  test("should delete a specific todo with valid id", async ({ request }) => {
    const response = await request.delete(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    await expect(response.status()).toEqual(204)
  })

  test("should subtract -1 to the current number of todos when deleting one", async ({
    request,
  }) => {
    // Check current amount of todos
    let amountTodos
    let newAmountTodos

    let response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    let responseBody = await response.json()
    amountTodos = responseBody.data.length

    response = await request.delete(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    expect(response.status()).toEqual(204)

    response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })

    responseBody = await response.json()
    newAmountTodos = responseBody.data.length
    await expect(newAmountTodos).toEqual(amountTodos - 1)
  })

  test("should not delete a todo with invalid id", async ({ request }) => {
    const response = await request.delete(
      `${apiUrl}/api/todo/${invalidTodo.invalidId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    )
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual(
      `Todo with id ${invalidTodo.invalidId} not found`
    )
  })

  test("should not delete a todo with invalid token", async ({ request }) => {
    const response = await request.delete(`${apiUrl}/api/todo/${ctx.todoId}`)
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual("Unauthorized: No token provided.")
  })
})
