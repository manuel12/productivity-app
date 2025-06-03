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
const validTodoUpdate = todoData.validData.singleUpdatedTodo
const invalidTodo = todoData.invalidData
const invalidDataTypeTodo = todoData.invalidData.invalidDataTypeTodo
const invalidTodoId = todoData.invalidData.invalidId

test.describe("UPDATE Todo - (PATCH) /api/todo/:", () => {
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

  test("should update a specific todo with valid data", async ({ request }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodoUpdate,
    })
    const responseBody = await response.json()
    console.log(responseBody)

    console.log(token)
    await expect(responseBody.message).toEqual("Todo successfully updated!")
    await expect(responseBody.data.completed).toEqual(validTodoUpdate.completed)
    await expect(responseBody.data.description).toEqual(
      validTodoUpdate.description
    )
  })

  test("should not update a todo with invalid data", async ({ request }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: invalidDataTypeTodo,
    })
    const responseBody = await response.json()

    await expect(response.status()).toEqual(400)
    await expect(responseBody.error).toEqual(
      "No completed (boolean) specified, No description (string) specified."
    )
  })

  test("should not update a todo with invalid id", async ({ request }) => {
    const response = await request.patch(
      `${apiUrl}/api/todo/${invalidTodoId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        data: validTodoUpdate,
      }
    )
    const responseBody = await response.json()
    await expect(response.status()).toEqual(404)
    await expect(responseBody.error).toEqual(
      `Todo with id ${invalidTodoId} not found.`
    )
  })

  test("should not update todo with empty data", async ({ request }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {},
    })
    await expect(response.status()).toEqual(400)
  })

  test("should respond with a message indicating any missing data", async ({
    request,
  }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: invalidDataTypeTodo,
    })
    const responseBody = await response.json()
    console.log(token)
    await expect(responseBody.error).toEqual(
      "No completed (boolean) specified, No description (string) specified."
    )
  })

  test("should not update a todo with invalid token", async ({ request }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      data: invalidDataTypeTodo,
    })
    const responseBody = await response.json()

    await expect(response.status()).toEqual(401)
    await expect(responseBody.error).toEqual("Unauthorized: No token provided.")
  })

  test("should respond with error message 'Description must be at least 3 characters.' when submitting a shorter description", async ({
    request,
  }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        completed: validTodo.completed,
        description: invalidTodo.descriptionShorterThan3Chars,
      },
    })
    const responseBody = await response.json()

    await expect(response.status()).toEqual(400)
    await expect(responseBody.error).toEqual(
      "Description must be at least 3 characters."
    )
  })

  test("should respond with error message 'Description must be shorter than 40 characters.' when submitting a longer description", async ({
    request,
  }) => {
    const response = await request.patch(`${apiUrl}/api/todo/${ctx.todoId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {
        completed: validTodo.completed,
        description: invalidTodo.descriptionLongerThan40Chars,
      },
    })
    const responseBody = await response.json()

    await expect(response.status()).toEqual(400)
    await expect(responseBody.error).toEqual(
      "Description must be shorter than 40 characters."
    )
  })
})
