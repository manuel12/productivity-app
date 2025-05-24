const { expect } = require("@playwright/test")

const apiUrl = "http://localhost:4000"
const defaultTestUser = {
  username: "testuser1",
  email: "testuser1@gmail.com",
  password: "Testpass1!",
}

/**
 * Registers a new user via API.
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request fixture.
 * @param {object} [user] - Optional user object with username, email, password.
 * If not provided, a default test user will be used.
 * @returns {Promise<import('@playwright/test').APIResponse>} - The API response object.
 */

async function registerWithAPI(request, user) {
  const userToRegister = user || defaultTestUser

  const response = await request.post(`${apiUrl}/api/user/`, {
    data: {
      // Playwright uses 'data' for the request body
      username: userToRegister.username,
      email: userToRegister.email,
      password: userToRegister.password,
    },
  })
  return response
}

/**
 * Logs in a user via API and optionally sets browser local storage.
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request fixture for API calls.
 * @param {object} [options] - Optional object for page context and custom user.
 * @param {import('@playwright/test').Page} [options.page] - Optional Playwright Page object to interact with browser context (e.g., set localStorage).
 * @param {object} [options.user] - Optional user object with email and password. Defaults to `testuser`.
 * @returns {Promise<import('@playwright/test').APIResponse>} - The API response object.
 */

async function loginWithAPI(request, options = {}) {
  // Destructure page and user from options, with fallback
  const { page, user = defaultTestUser } = options

  const response = await request.post(`${apiUrl}/api/login/`, {
    data: {
      // Playwright uses 'data' for the request body
      email: user.email,
      password: user.password,
    },
  })
  // If a 'page' object is provided, set the 'userLoggedIn' item in its local storage
  if (page) {
    // You might also extract a token from the response here and set it

    const responseBody = await response.json()
    if (responseBody && responseBody.token) {
      await page.evaluate((token) => {
        localStorage.setItem("token", JSON.stringify(token))
      }, responseBody.token)

      await page.evaluate(() => {
        localStorage.setItem("userLoggedIn", "true")
      })
    }
  }

  return response
}

/**
 * Logs in a user to the application.
 * @param {import('@playwright/test').Page} page The Playwright Page object.
 * @param {string} email The user's email.
 * @param {string} password The user's password.
 */
// async function login(page, email, password) {
//   // 1. Visit http://localhost:3000/
//   await page.goto("http://localhost:3000/")

//   // 2. Enter email on email input
//   await page.getByTestId("email").fill(email)

//   // 3. Enter password on password input
//   await page.getByTestId("password").fill(password)

//   // 4. Click 'LOGIN' button
//   await page.getByTestId("login-button").click()

//   // 5. Check no error messages are shown
//   await expect(page.getByTestId("form-action-error")).not.toBeVisible()

//   // 6. Check the app redirects to http://localhost:3000/
//   await expect(page).toHaveURL("http://localhost:3000/")
// }

/**
 * Creates a new todo item via API.
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request fixture.
 * @param {string} token - The authorization bearer token.
 * @param {string} description - The description of the todo item.
 * @param {boolean} [completed=false] - Whether the todo item is completed. Defaults to false.
 * @returns {Promise<import('@playwright/test').APIResponse>} - The API response object.
 */

async function createTodoWithAPI(
  request,
  token,
  description,
  completed = false
) {
  const response = await request.post(`${apiUrl}/api/todo/`, {
    headers: {
      Authorization: `Bearer ${token}`, // Use the provided token
      "Content-Type": "application/json",
    },
    data: {
      // Playwright uses 'data' for the request body
      completed: completed,
      description: description,
    },
  })

  return response
}

/**
 * Deletes test users via API.
 * Asserts that the response status is 204.
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request fixture.
 * @param {string} token - The authorization bearer token.
 * @returns {Promise<void>} - A promise that resolves after the request and assertion.
 */

async function deleteTestUsers(request) {
  console.log("Attempting to delete test users...")

  const response = await request.delete(
    `${apiUrl}/api/users/delete-test-users/`
  )

  console.log("Delete Test Users Response:", {
    status: response.status(),
    statusText: response.statusText(),
    url: response.url(),
    // body: await response.text(), // Uncomment if you want to see the body (might be empty for 204)
  })

  // Assert the status code
  await expect(response.status()).toBe(204)
}

/**
 * Delete test todos via API.
 * Asserts that the response status is 204
 * @param {import('@playwright/test').APIRequestContext} request - The Playwright request fixture.
 * @param {string} token - The authorization bearer token.
 * @returns {Promise<void>} - A promise that resolves after the request and assertion.
 */

async function deleteTestTodos(request, token) {
  console.log("Attempting to delete test todos...")

  const response = await request.delete(
    `${apiUrl}/api/todos/delete-test-todos/`
  )

  console.log("Delete Test Todos Response:", {
    status: response.status(),
    statusText: response.statusText(),
    url: response.url(),
  })

  // Assert the status code
  await expect(response.status()).toBe(204)
}

module.exports = {
  defaultTestUser,
  deleteTestUsers,
  deleteTestTodos,
  registerWithAPI,
  loginWithAPI,
  createTodoWithAPI,
  //   login,
}
