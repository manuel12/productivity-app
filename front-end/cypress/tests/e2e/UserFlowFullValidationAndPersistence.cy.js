/// <reference types="cypress" />

const userData = require("../../../fixtures/users/userData.json")
const testuser = userData.validData
const invalidCredentials = userData.invalidData

const todoData = require("../../fixtures/todos/todoData.json")
const validTodo = todoData.validData
const invalidTodo = todoData.invalidData

describe("UserFlowFullValidationAndTodoDataPersistence", () => {
  before(() => {
    cy.deleteTestUsers()
  })

  it("should check all auth validation checks and todo data persistance", () => {
    // 1. Visit /accounts/login
    cy.step("/accounts/login")
    cy.visit("/accounts/login")

    // 2. Click on 'CREATE ACCOUNT' button
    cy.step("Click on 'CREATE ACCOUNT' button")
    cy.contains("CREATE ACCOUNT").click()

    // 3. Check app redirects to /account/register
    cy.step("Check app redirects to /account/register")
    cy.url().should("include", "/account/register")

    // 4. Click on 'REGISTER' button
    cy.step("Click on 'REGISTER' button")
    cy.contains("REGISTER").click()

    // -- REGISTER VALIDATION --

    // -- USERNAME --
    // 5. Check username input displays error label with text 'A username is required.'
    cy.step(
      "Check username input displays error label with text 'A username is required."
    )
    cy.getBySel("username-error-label")
      .should("be.visible")
      .and("have.text", "A username is required.")

    // 6. Type usernameShoterThan6Chars in username input
    cy.step("Type usernameShoterThan6Chars in username input")
    cy.getBySel("username").type(invalidCredentials.usernameShoterThan6Chars)

    // 7. Check username input displays error label with text 'Username must be at least 6 characters.'
    cy.step(
      "Check username input displays error label with text 'Username must be at least 6 characters.'"
    )
    cy.getBySel("username-error-label")
      .should("be.visible")
      .and("have.text", "Username must be at least 6 characters.")

    // 8. Type usernameLongerThan20Chars in username input
    cy.step("Type usernameLongerThan20Chars in username input")
    cy.getBySel("username")
      .clear()
      .type(invalidCredentials.usernameLongerThan20Chars)

    // 9. Check username input displays error label with text 'Username must be shorter than 20 characters.'
    cy.step(
      "Check username input displays error label with text 'Username must be shorter than 20 characters.'"
    )
    cy.getBySel("username-error-label")
      .should("be.visible")
      .and("have.text", "Username must be shorter than 20 characters.")

    // -- EMAIL --
    // 10. Check email input displays error label with text 'An email address is required.'
    cy.step(
      "Check email input displays error label with text 'An email address is required.'"
    )

    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "An email address is required.")

    // 11. Type invalidEmail in email input
    cy.step("Type invalidEmail in email input")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 12. Check email input displays error label with text 'Email must be valid.'
    cy.step(
      "Check email input displays error label with text 'Email must be valid.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be valid.")

    // 13. Type emailShorterThan6Chars in email input
    cy.step("Type emailShorterThan6Chars in email input")
    cy.getBySel("email").clear().type(invalidCredentials.emailShorterThan6Chars)

    // 14. Check email input displays error label with text 'Email must be at least 6 characters.'
    cy.step(
      "Check email input displays error label with text 'Email must be at least 6 characters.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be at least 6 characters.")

    // 15. Type emailLongerThan255Chars in email input
    cy.step("Type emailLongerThan255Chars in email input'")
    cy.getBySel("email")
      .clear()
      .type(invalidCredentials.emailLongerThan255Chars)

    // 16. Check email input displays error label with text 'Email must be shorter than 255 characters.'
    cy.step(
      "Check email input displays error label with text 'Email must be shorter than 255 characters.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be shorter than 255 characters.")

    // -- PASSWORD --
    // 17. Check password input displays error label with text 'A password is required.'
    cy.step(
      "Check password input displays error label with text 'A password is required.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "A password is required.")

    // 18. Type passwordShorterThan8Chars in password input
    cy.step("Type passwordShorterThan8Chars in password input")
    cy.getBySel("password").type(invalidCredentials.passwordShorterThan8Chars)

    // 19. Check password input displays error label with text 'Password must be at least 8 characters.'
    cy.step(
      "Check password input displays error label with text 'Password must be at least 8 characters.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must be at least 8 characters.")

    // 20. Type noUppercasePassword in password input
    cy.step("Type noUppercasePassword in password input")
    cy.getBySel("password").clear().type(invalidCredentials.noUppercasePassword)

    // 21. Check password input displays error label with text 'Password must contain at least 1 uppercase character.'
    cy.step(
      "Check password input displays error label with text 'Password must contain at least 1 uppercase character.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must contain at least 1 uppercase character.")

    // 22. Type noLowercasePassword in password input
    cy.step("Type noLowercasePassword in password input")
    cy.getBySel("password").clear().type(invalidCredentials.noLowercasePassword)

    // 23. Check password input displays error label with text 'Password must contain at least 1 lowercase character.'
    cy.step(
      "Check password input displays error label with text 'Password must contain at least 1 lowercase character.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must contain at least 1 lowercase character.")

    // 24. Type noNumberPassword in password input
    cy.step("Type noNumberPassword in password input")
    cy.getBySel("password").clear().type(invalidCredentials.noNumberPassword)

    // 25. Check password input displays error label with text 'Password must contain at least 1 number character.'
    cy.step(
      "Check password input displays error label with text 'Password must contain at least 1 number character.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must contain at least 1 number character.")

    // 26. Type noSpecialCharacterPassword in password input
    cy.step("Type noSpecialCharacterPassword in password input")

    cy.getBySel("password")
      .clear()
      .type(invalidCredentials.noSpecialCharPassword)

    // 27. Check password input displays error label with text 'Password must contain at least 1 special character.'
    cy.step(
      "Check password input displays error label with text 'Password must contain at least 1 special character.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must contain at least 1 special character.")

    // -- PASSWORD CONFIRMATION --
    // 28. Check password confirmation input displays error label with text 'A password confirmation is required.'
    cy.step(
      "Check password confirmation input displays error label with text 'A password confirmation is required.'"
    )
    cy.getBySel("password-confirmation-error-label")
      .should("be.visible")
      .and("have.text", "A password confirmation is required.")

    // 29. Type incorrectPasswordConfirmation in password confirmation input
    cy.step("Type incorrectPasswordConfirmation in password confirmation input")
    cy.getBySel("password-confirmation").type("incorrect")

    // 30. Check password confirmation input displays error label with text 'Passwords do not match.'
    cy.step(
      "Check password confirmation input displays error label with text 'Passwords do not match.'"
    )
    cy.getBySel("password-confirmation-error-label")
      .should("be.visible")
      .and("have.text", "Passwords do not match.")

    // 31. Type username on username input
    cy.step("Type username on username input")
    cy.getBySel("username").clear().type(testuser.username)

    // 32. Type email on email input
    cy.step("Type email on email input")
    cy.getBySel("email").clear().type(testuser.email)

    // 33. Type password on password input
    cy.step("Type password on password input")
    cy.getBySel("password").clear().type(testuser.password)

    // 34. Type password confirmation on password confirmation input
    cy.step("Type password confirmation on password confirmation input")
    cy.getBySel("password-confirmation").clear().type(testuser.password)

    // 35. Click 'REGISTER' button
    cy.step("Click 'REGISTER' button")
    cy.contains("REGISTER").click()

    // 36. Check register success message with text 'User testuser1@gmail.com successfully registered!' is visible
    cy.step(
      "Check register success message with text 'User testuser1@gmail.com successfully registered!' is visible"
    )
    cy.getBySel("form-action-success")
      .should("be.visible")
      .and("contain.text", `User ${testuser.email} successfully registered!`)

    // 37. Check app redirects to /account/login
    cy.step("Check app redirects to /account/login")
    cy.url().should("include", "/account/login")

    // 38. Click on 'LOGIN' button
    cy.step("Click on 'LOGIN' button")
    cy.contains("LOGIN").click()

    // -- LOGIN VALIDATION --

    // -- EMAIL --
    // 39. Check email input displays error label with text 'An email address is required.'
    cy.step(
      "Check email input displays error label with text 'An email address is required.'"
    )
    cy.getBySel("email-error-label") // here error
      .should("be.visible")
      .and("have.text", "An email address is required.")

    // 40. Type invalidEmail in email input
    cy.step("Type invalidEmail in email input")
    cy.getBySel("email").type(invalidCredentials.invalidEmail)

    // 41. Check email input displays error label with text 'Email must be valid.'
    cy.step(
      "Check email input displays error label with text 'Email must be valid.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be valid.")

    // 42. Type emailShorterThan6Chars in email input
    cy.step("Type emailShorterThan6Chars in email input")
    cy.getBySel("email").clear().type(invalidCredentials.emailShorterThan6Chars)

    // 43. Check email input displays error label with text 'Email must be at least 6 characters.'
    cy.step(
      "Check email input displays error label with text 'Email must be at least 6 characters.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be at least 6 characters.")

    // 44. Type emailLongerThan255Chars in email input
    cy.step("Type emailLongerThan255Chars in email input")
    cy.getBySel("email")
      .clear()
      .type(invalidCredentials.emailLongerThan255Chars)

    // 45. Check email input displays error label with text 'Email must be shorter than 255 characters.'
    cy.step(
      "Check email input displays error label with text 'Email must be shorter than 255 characters.'"
    )
    cy.getBySel("email-error-label")
      .should("be.visible")
      .and("have.text", "Email must be shorter than 255 characters.")

    // -- PASSWORD --
    // 46. Check password input displays error label with text 'A password is required.'
    cy.step(
      "Check password input displays error label with text 'A password is required.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "A password is required.")

    // 47. Type passwordShorterThan8Chars in password input
    cy.step("Type passwordShorterThan8Chars in password input")
    cy.getBySel("password").type(invalidCredentials.passwordShorterThan8Chars)

    // 48. Check password input displays error label with text 'Password must be at least 8 characters.'
    cy.step(
      "Check password input displays error label with text 'Password must be at least 8 characters.'"
    )
    cy.getBySel("password-error-label")
      .should("be.visible")
      .and("have.text", "Password must be at least 8 characters.")

    // 57. Type email on email input
    cy.step("Type email on email input")
    cy.getBySel("email").clear().type(testuser.email)

    // 58. Type password on password input
    cy.step("Type password on password input")
    cy.getBySel("password").clear().type(testuser.password)

    // 59. Click 'LOGIN' button
    cy.step("Click 'LOGIN' button")
    cy.contains("LOGIN").click()

    // 60. Check login success message with text 'Login successful!' is visible
    cy.step(
      "Check login success message with text 'Login successful!' is visible"
    )
    cy.contains("Login successful!").should("be.visible")

    // 61. Check there are no todos created
    cy.step("Check there are no todos created")
    cy.getBySel("todo-item").should("not.exist")

    // 62. Check the text 'No todos added yet...' is displayed
    cy.step("Check the text 'No todos added yet...' is displayed")
    cy.contains("No todos added yet...").should("be.visible")

    // 63. Click on 'Add Todo' button
    cy.step("Click on 'Add Todo' button")
    cy.contains("Add Todo").click()

    // -- ADD TODO --
    // 64. Check todo input displays error label with text 'Todo description text is required.'
    cy.step(
      "Check todo input displays error label with text 'Todo description text is required.'"
    )
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todo description text is required.")

    // 65. Type shortTodoDescription on todo input
    cy.step("Type shortTodoDescription on todo input")
    cy.getBySel("todo-input").type(invalidTodo.descriptionShorterThan3Chars)

    // 66. Check todo input displays error label with text 'Todos must be at least 3 characters.'
    cy.step(
      "Check todo input displays error label with text 'Todos must be at least 3 characters.'"
    )
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos must be at least 3 characters.")

    // 67. Type longTodoDescription on todo input
    cy.step("Type longTodoDescription on todo input")
    cy.getBySel("todo-input")
      .clear()
      .type(invalidTodo.descriptionLongerThan40Chars)

    // 68. Check todo input displays error label with text 'Todos cannot contain more than 40 characters.'
    cy.step(
      "Check todo input displays error label with text 'Todos cannot contain more than 40 characters.'"
    )
    cy.getBySel("input-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    // 69. Type todoDescription in todo input
    cy.step("Type todoDescription in todo input")
    cy.getBySel("todo-input").clear().type(validTodo.description1)

    // 70. Click 'Add Todo' button
    cy.step("Click 'Add Todo' button")
    cy.contains("Add Todo").click()

    // 71. Check the text 'No todos added yet...' is not visible
    cy.step("Check the text 'No todos added yet...' is not visible")
    cy.contains("No todos added yet...").should("not.exist")

    // 72. Check the tabs Uncompleted, Completed and All are visible
    cy.step("Check the tabs Uncompleted, Completed and All are visible")
    cy.contains("Uncompleted").should("be.visible")
    cy.contains("Completed").should("be.visible")
    cy.contains("All").should("be.visible")

    // 73. Check the newly added todo is visible
    cy.step("Check the newly added todo is visible")
    cy.getBySel("todo-item")
      .should("be.visible")
      .and("contain", validTodo.description1)

    // 74. Click on todo description text for it to convert into an input
    cy.step("Click on todo description text for it to convert into an input")
    cy.getBySel("todos-description-container").click()

    // -- EDIT TODO --

    // 75. Delete todo description text
    cy.step("Delete todo description text")
    cy.getBySel("todos-text-input").clear()

    // 76. Type shortTodoDescription text into todo input
    cy.step("Type shortTodoDescription text into todo input")
    cy.getBySel("todos-text-input").type(
      invalidTodo.descriptionShorterThan3Chars
    )

    // 77. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 78. Check todo edit input displays error label with text 'Todos must be at least 3 characters.'
    cy.step(
      "Check todo edit input displays error label with text 'Todos must be at least 3 characters.'"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos must be at least 3 characters.")

    // 79. Type longTodoDescription text into todo input
    cy.step("Type longTodoDescription text into todo input")
    cy.getBySel("todos-text-input")
      .clear()
      .type(invalidTodo.descriptionLongerThan40Chars)

    // 80. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 81. Check todo edit input displays error label with text 'Todos cannot contain more than 40 characters.'
    cy.step(
      "Check todo edit input displays error label with text 'Todos cannot contain more than 40 characters.'"
    )
    cy.getBySel("todo-error-label")
      .should("be.visible")
      .and("have.text", "Todos cannot contain more than 40 characters.")

    // 82. Type updatedTodoDescription text into todo input
    cy.step("Type updatedTodoDescription text into todo input")
    cy.getBySel("todos-text-input").clear().type(validTodo.description2)

    // 83. Press ENTER key
    cy.step("Press ENTER key")
    cy.getBySel("todos-text-input").type("{enter}")

    // 84. Check that todo now displays the updated description text
    cy.step("Check that todo now displays the updated description text")
    cy.getBySel("todo-item")
      .should("be.visible")
      .and("contain", validTodo.description2)

    // 85. Reload the page
    cy.step("Reload the page")
    cy.reload()

    // 86. Check that todo is displayed and displays the updated description text
    cy.step(
      "Check that todo is displayed and displays the updated description text"
    )
    cy.getBySel("todo-item")
      .should("be.visible")
      .and("contain", validTodo.description2)
  })
})
