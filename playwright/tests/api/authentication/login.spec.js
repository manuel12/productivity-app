// @ts-check
import { test, expect } from "@playwright/test"
const {
  deleteTestUsersWithAPI,
  registerWithAPI,
  loginWithAPI,
  createTodoWithAPI,
  deleteTestTodosWithAPI,
} = require("../../utils/utils")

const userData = require("../../data/userData.json")
const validUser = userData.validData
const invalidUser = userData.invalidData
const unexistingUser = userData.invalidData.unexistingUser

test.describe("LOGIN User - (POST) /api/login", () => {
  const apiUrl = "http://localhost:4000"

  test.beforeAll(async ({ request }) => {
    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
  })

  test("should allow a user to log in with valid (existing) data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: {
        // Playwright uses 'data' for the request body
        email: validUser.email,
        password: validUser.password,
      },
    })

    expect(response.status()).toEqual(200)
  })

  test("should include a success message in its response", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: {
        // Playwright uses 'data' for the request body
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.message).toEqual("User successfully logged in!")
  })

  test("should include the correct user properties in its response", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: {
        // Playwright uses 'data' for the request body
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    const userData = responseBody.data

    expect(userData).toHaveProperty("id")
    expect(userData).toHaveProperty("username")
    expect(userData).toHaveProperty("email")
  })

  test("should not allow a user to log in with invalid (unexisting) data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: unexistingUser,
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      `User ${unexistingUser.email} does not exist, register a user first!`
    )
  })

  test("should not allow a user to log in with empty data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: {},
    })
    expect(response.status()).toEqual(400)
  })

  test("should respond with a message indicating any missing credentials", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/login/`, {
      data: {},
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "No email (string) specified, No password (string) specified."
    )
  })

  test("should respond with error message 'Email must be at least 6 characters.' when submitting a shorter email address", async ({
    request,
  }) => {
    const testUser = {
      username: validUser.username,
      email: invalidUser.emailShorterThan6Chars,
      password: validUser.password,
    }

    const response = await request.post(`${apiUrl}/api/login/`, {
      data: testUser,
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual("Email must be at least 6 characters.")
  })

  test("should respond with error message 'Email must be shorter than 255 characters.' when submitting a longer email address", async ({
    request,
  }) => {
    const testUser = {
      username: validUser.username,
      email: invalidUser.emailLongerThan255Chars,
      password: validUser.password,
    }

    const response = await request.post(`${apiUrl}/api/login/`, {
      data: testUser,
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Email must be shorter than 255 characters."
    )
  })

  test("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter password", async ({
    request,
  }) => {
    const testUser = {
      username: validUser.username,
      email: validUser.password,
      password: invalidUser.passwordShorterThan8Chars,
    }

    const response = await request.post(`${apiUrl}/api/login/`, {
      data: testUser,
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Password must be at least 8 characters."
    )
  })

  test("should respond with error message 'Password must be less than 128 characters.' when submitting a longer password", async ({
    request,
  }) => {
    const testUser = {
      username: validUser.username,
      email: validUser.password,
      password: invalidUser.passwordLongerThan128Chars,
    }

    const response = await request.post(`${apiUrl}/api/login/`, {
      data: testUser,
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Password must be less than 128 characters."
    )
  })
})
