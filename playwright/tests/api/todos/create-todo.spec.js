// @ts-check
import { test, expect } from "@playwright/test"
const {
  deleteTestUsersWithAPI,
  deleteTestTodosWithAPI,
  registerWithAPI,
  loginWithAPI,
} = require("../../utils/utils")

const todoData = require("../../data/todoData.json")
const validTodo = todoData.validData.singleTodo
const invalidTodo = todoData.invalidData

test.describe("CREATE Todo - (POST) /api/todo/:id", () => {
  const apiUrl = "http://localhost:4000"
  let token
  test.beforeAll(async ({ request }) => {
    await deleteTestUsersWithAPI(request)

    await registerWithAPI(request)
    await loginWithAPI(request).then(async (response) => {
      const responseBody = await response.json()
      token = responseBody.token
      await deleteTestTodosWithAPI(request, token)
    })
  })

  test("should create a todo with valid data", async ({ request }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodo,
    })
    const responseBody = await response.json()
    const lastTodo = responseBody.data
    await expect(lastTodo).toMatchObject(validTodo)
  })

  test("should have correct success message on response", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodo,
    })
    const responseBody = await response.json()

    await expect(responseBody.message).toEqual("Todo successfully created!")
  })

  test("should have properties of correct type", async ({ request }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodo,
    })
    const responseBody = await response.json()
    const lastTodo = responseBody.data
    await expect(lastTodo).toMatchObject(validTodo)
  })

  test("should have last id on response", async ({ request }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodo,
    })
    const responseBody = await response.json()
    const lastTodo = responseBody.data
    await expect(lastTodo).toHaveProperty("id")
  })

  test("should add +1 to the current number of todos", async ({ request }) => {
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

    response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: validTodo,
    })

    response = await request.get(`${apiUrl}/api/todos/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    responseBody = await response.json()
    newAmountTodos = responseBody.data.length

    await expect(newAmountTodos).toEqual(amountTodos + 1)
  })

  test("should not create a todo with invalid data", async ({ request }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: invalidTodo,
    })
    const responseBody = await response.json()
    await expect(response.status()).toEqual(400)
    await expect(responseBody.error).toEqual(
      "No completed (boolean) specified, No description (string) specified."
    )
  })

  test("should not allow a user to create todo with empty data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
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
    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: {},
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "No completed (boolean) specified, No description (string) specified."
    )
  })

  test("should not create a todo with invalid token", async ({ request }) => {
    const response = await request.post(`${apiUrl}/api/todo/`, {
      data: validTodo,
    })
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual("Unauthorized: No token provided.")
  })

  test("should respond with error message 'Description must be at least 3 characters.' when submitting a shorter description", async ({
    request,
  }) => {
    const todo = {
      completed: validTodo.completed,
      description: invalidTodo.descriptionShorterThan3Chars,
    }

    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: todo,
    })
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual(
      "Description must be at least 3 characters."
    )
  })

  test("should respond with error message 'Description must be shorter than 40 characters.' when submitting a longer description", async ({
    request,
  }) => {
    const todo = {
      completed: validTodo.completed,
      description: invalidTodo.descriptionLongerThan40Chars,
    }

    const response = await request.post(`${apiUrl}/api/todo/`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: todo,
    })
    const responseBody = await response.json()
    await expect(responseBody.error).toEqual(
      "Description must be shorter than 40 characters."
    )
  })
})
