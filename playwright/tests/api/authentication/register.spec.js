// @ts-check
import { test, expect } from "@playwright/test"
const { deleteTestUsers } = require("../../utils/utils")

const userData = require("../../data/userData.json")
const validUser = userData.validData
const invalidUser = userData.invalidData

test.describe("REGISTER User - (POST) /api/user", () => {
  const apiUrl = "http://localhost:4000"

  test.beforeAll(async ({ request }) => {
    await deleteTestUsers(request)
  })

  test("should allow a user to register with valid data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: validUser.password,
      },
    })

    expect(response.status()).toEqual(201)
  })

  test("should respond with a success message when registering user", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.message).toEqual(
      `User ${validUser.email} successfully registered!`
    )
  })

  test("should respond with the correct properties for the registered user", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    const userData = responseBody.data
    expect(userData).toHaveProperty("id")
    expect(userData).toHaveProperty("username", validUser.username)
    expect(userData).toHaveProperty("email", validUser.email)
  })

  test("should not allow a user to register with invalid (existing) data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.message).toEqual(
      `User ${validUser.email} successfully registered!`
    )

    const response2 = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody2 = await response2.json()
    expect(responseBody2.error).toEqual(
      `A user with email ${validUser.email} already exists!`
    )
  })

  test("should not allow a user to register with empty data", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {},
    })
    expect(response.status()).toEqual(400)
  })

  test("should respond with a message indicating any missing credentials", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {},
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "No username (string) specified, No email (string) specified, No password (string) specified."
    )
  })

  test("should respond with error message 'Username must be at least 6 characters.' when submitting a shorter email address", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: invalidUser.usernameShoterThan6Chars,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Username must be at least 6 characters."
    )
  })

  test("should respond with error message 'Username must be shorter than 20 characters.' when submitting a longer username", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: invalidUser.usernameLongerThan20Chars,
        email: validUser.email,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Username must be shorter than 20 characters."
    )
  })

  test("should respond with error message 'Email must be at least 6 characters.' when submitting a shorter email address", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: invalidUser.emailShorterThan6Chars,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual("Email must be at least 6 characters.")
  })

  test("should respond with error message 'Email must be shorter than 255 characters.' when submitting a longer email address", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: invalidUser.emailLongerThan255Chars,
        password: validUser.password,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Email must be shorter than 255 characters."
    )
  })

  test("should respond with error message 'Password must be at least 8 characters.' when submitting a shorter", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: invalidUser.passwordShorterThan8Chars,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Password must be at least 8 characters."
    )
  })

  test("should respond with error message 'Password must be less than 128 characters.' when submitting a longer password", async ({
    request,
  }) => {
    const response = await request.post(`${apiUrl}/api/user/`, {
      data: {
        // Playwright uses 'data' for the request body
        username: validUser.username,
        email: validUser.email,
        password: invalidUser.passwordLongerThan128Chars,
      },
    })
    const responseBody = await response.json()
    expect(responseBody.error).toEqual(
      "Password must be less than 128 characters."
    )
  })
})
