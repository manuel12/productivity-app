// @ts-check
import { test, expect } from "@playwright/test"
const {
  deleteTestUsersWithAPI,
  registerWithAPI,
  loginWithAPI,
  createTodoWithAPI,
  deleteTestTodosWithAPI,
} = require("../utils/utils")

const userData = require("../data/userData.json")
const testuser = userData.validData
const todoData = require("../data/todoData.json")
const validTodo = todoData.validData

test.describe("Register", () => {
  test.beforeEach(async ({ page, request }) => {
    await deleteTestUsersWithAPI(request)
  })

  test("should allow the user to register with valid credentials", async ({
    page,
  }) => {
    // 1. http://localhost:3000/account/register/
    await page.goto("http://localhost:3000/account/register/")

    // 2. Enter username on username input
    await page.getByTestId("username").fill(testuser.username)

    // 3. Enter email on email input
    await page.getByTestId("email").fill(testuser.email)

    // 4. Enter password on password input
    await page.getByTestId("password").fill(testuser.password)

    // 5. Enter passwordConfirmation on password confirmation input
    await page.getByTestId("password-confirmation").fill(testuser.password)

    // 6. Click 'REGISTER' button
    await page.getByTestId("register-button").click()

    // 7. Expect  http://localhost:3000/account/login/
    await expect(page).toHaveURL("http://localhost:3000/account/login")
  })
})

test.describe("Login", () => {
  test("should allow the user to login with valid credentials", async ({
    page,
  }) => {
    // 1.Visit http://localhost:3000/
    await page.goto("/")

    // 2. Enter email on email input
    await page.getByTestId("email").fill(testuser.email)

    // 3. Enter password on password input
    await page.getByTestId("password").fill(testuser.password)

    // 4. Click 'LOGIN' button
    await page.getByTestId("login-button").click()

    // 5. Check no error messages are shown
    await expect(page.getByTestId("form-action-error")).not.toBeVisible()

    // 6. Check the app redirects to http://localhost:3000/
    expect(page).toHaveURL("http://localhost:3000/")

    // 7. Check the login form is not visible
    await expect(page.getByTestId("login-form")).not.toBeVisible()

    // 8. Check the navbar is visible
    await expect(page.getByTestId("navbar")).toBeVisible()
  })

  test("should redirect to login page when user is not logged in", async ({
    page,
  }) => {
    // 1. Visit http://localhost:3000/
    await page.goto("/")

    // 2. Check the app redirects to /account/login
    await expect(page).toHaveURL("http://localhost:3000/account/login")

    // 3. Visit http://localhost:3000/todos/
    await page.goto("http://localhost:3000/todos/")

    // 4. Check the app redirects to /account/login
    await expect(page).toHaveURL("http://localhost:3000/account/login")

    // 5. Visit http://localhost:3000/dailies/
    await page.goto("http://localhost:3000/dailies/")

    // 6. Check the app redirects to /account/login
    await expect(page).toHaveURL("http://localhost:3000/account/login")
  })
})

test.describe("Add todo", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
    })

    await page.goto("/")
  })

  test('should add a todo by writing on input and clicking on a "Add todo" button', async ({
    page,
  }) => {
    // 1. Enter todoDescription on the input on input
    await page.getByTestId("todo-input").fill(validTodo.description1)

    // 2. Click 'Add Todo' button
    await page.getByTestId("todo-submit").click()

    // 3. Check a new todo item is added with the text 'Feed the cats(test)'
    await expect(page.getByTestId("todo-item")).toBeVisible()
    await expect(page.getByTestId("todo-item")).toHaveCount(1)
  })
})

test.describe("Edit todo", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(request, token, validTodo.description1)
    })
    await page.goto("/")
  })

  test("should edit a todo", async ({ page }) => {
    // 1. Click on the todo's description text to turn it into an input
    await page.getByTestId("todos-description-container").click()

    // 2. Delete the current description
    await page.getByTestId("todos-text-input").fill("")

    // 3. Enter todoDescription on the input
    await page
      .getByTestId("todos-text-input")
      .fill(validTodo.updateDescription1)

    // 4. Press ENTER key
    await page.getByTestId("todos-text-input").press("Enter")

    // 5. Check the old description text is not visible in the todo
    await expect(page.getByText(validTodo.description1)).not.toBeVisible()

    // 6. Check the new description text is visible in the todo
    await expect(page.getByText(validTodo.updateDescription1)).toBeVisible()
  })
})

test.describe("Delete todo", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(request, token, validTodo.description1)
    })
    await page.goto("/")
  })

  test("should delete a todo", async ({ page }) => {
    // 1. Find the todo with the text 'Feed the cats(test)'
    const todoElement = page.getByTestId("todo-item")
    await expect(todoElement).toBeVisible()

    // 2. Click on the todo's 'X' button
    const todoDeleteButton = todoElement.locator(".remove-icon-container")
    await todoDeleteButton.click()

    // 3. Check the todo is deleted from the todo list
    await expect(todoElement).not.toBeVisible()
  })
})

test.describe("Complete todo", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(request, token, validTodo.description1)
    })
    await page.goto("/")
  })

  test("should mark a todo as complete", async ({ page }) => {
    // 1. Check that first todo is not marked as completed (has grey checkmark icon)
    const todoElement = page.getByTestId("todo-item")
    await expect(todoElement).toBeVisible()

    const todoCheckMarkIcon = todoElement.locator(".fa-circle-check")
    await expect(todoCheckMarkIcon).toHaveClass(/check-not-completed/)

    // 2. Click on the checkmark icon to mark as completed
    await todoCheckMarkIcon.click()

    // Click the complete tab
    await page.getByTestId("complete-tab").click()

    // 3. Check the todo completed sound is played and the todo dissapears from uncompleted list
    await expect(todoElement).toBeVisible()
  })
})

test.describe("Uncomplete todo", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(request, token, validTodo.description1, true)
    })
    await page.goto("/")
    await page.getByTestId("complete-tab").click()
  })

  test("should mark todo as uncompleted", async ({ page }) => {
    // 1. Check that todo appears on the Completed tab
    const todoElement = page.getByTestId("todo-item")
    await expect(todoElement).toBeVisible()

    // 2. Click on the checkmark icon to mark as uncompleted
    const todoCheckMarkIcon = todoElement.locator(".fa-circle-check")
    await todoCheckMarkIcon.click()

    // 3. Check todo dissapears from Completed tab
    await expect(todoElement).not.toBeVisible()

    // 4. Click on the Uncompleted tab
    await page.getByTestId("uncomplete-tab").click()

    // 5. Check todo appears on the Uncompleted tab
    await expect(todoElement).toBeVisible()
  })
})

test.describe("Tabs", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    }).then(async (response) => {
      const responseBody = await response.json()
      const token = responseBody.token
      await deleteTestTodosWithAPI(request)
      await createTodoWithAPI(request, token, validTodo.description1)
      await createTodoWithAPI(request, token, validTodo.description2)
      await createTodoWithAPI(request, token, validTodo.description3)
    })
    await page.goto("/")
  })

  test("should display 3 tabs above the todos list: 'All', 'Completed', 'Uncompleted' ", async ({
    page,
  }) => {
    // 1. Check there are 3 tabs above the todo list: 'Uncompleted', 'Completed', 'All'
    const tabElement = page.getByTestId("todos-tabs")
    const allTab = tabElement.getByTestId("all-tab")
    await expect(allTab).toBeVisible()

    const completedTab = tabElement.getByTestId("complete-tab")
    await expect(completedTab).toBeVisible()

    const uncompleteTab = tabElement.getByTestId("uncomplete-tab")
    await expect(uncompleteTab).toBeVisible()
  })

  test("should by default have 'Uncompleted' tab active", async ({ page }) => {
    // 1. Check the 'Uncomplete' tab is active by default
    const tabElement = page.getByTestId("todos-tabs")
    const uncompleteTab = tabElement.getByTestId("uncomplete-tab")
    await expect(uncompleteTab).toHaveClass(/active/)
  })
})

test.describe("Navigation", () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto("/")

    await deleteTestUsersWithAPI(request)
    await registerWithAPI(request)
    await loginWithAPI(request, {
      page,
    })
    await page.goto("/")
  })

  test("should allow user to navigate to all the pages in the navbar", async ({
    page,
  }) => {
    // 1. Click on Home button on navbar
    await page.getByTestId("nav-link-home").click()

    // 2. Check url is http://localhost:3000/
    expect(page).toHaveURL("http://localhost:3000/")

    // 3. Click on Logout button on navbar
    await page.getByTestId("nav-link-logout").click()

    // 4. Check url is http://localhost:3000/account/login
    await expect(page).toHaveURL("http://localhost:3000/account/login")
  })
})
