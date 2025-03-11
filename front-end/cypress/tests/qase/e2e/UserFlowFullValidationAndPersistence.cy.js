/// <reference types="cypress" />

import { qase } from "cypress-qase-reporter/mocha"

describe("UserFlowFullValidationAndPersistence.cy", () => {
  const shortUsername = "abc"
  const longUsername = "abcdefghijklmnopqrst"
  const invalidEmail = "invalidEmail.com"
  const shortEmail = "a@com"
  const longEmail =
    "abcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyzabcdefghijklmnopqrstuvwxyz@example.com"
  const shortPassword = "Pass1!"
  const noUppercasePassword = "abcdefhg"
  const noLowercasePassword = "ABCDEFHG"
  const noNumberPassword = "Abcdefhg"
  const noSpecialCharacterPassword = "Abcdefhg1"
  const username = "testuser1"
  const email = "testuser1@gmail.com"
  const password = "Testpass1!"
  const passwordConfirmation = "Testpass1!"
  const shortTodoDescription = "ab"
  const longDescription =
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit."
  const todoDescription = "Feed the cats"
  const updatedTodoDescription = "Take out the trash"

  before(() => {
    cy.deleteTestUsers()
  })

  qase(
    77,
    it("should check all validation checks and data persistance", () => {
      // 1. Visit http://localhost:3000/accounts/login
      cy.visit("http://localhost:3000/accounts/login")

      // 2. Click on 'CREATE ACCOUNT' button
      cy.contains("CREATE ACCOUNT").click()

      // 3. Check app redirects to /account/register
      cy.url().should("include", "/account/register")

      // 4. Click on 'REGISTER' button
      cy.contains("REGISTER").click()

      // -- REGISTER VALIDATION --

      // -- USERNAME --
      // 5. Check username input displays error label with text 'A username is required.'
      cy.get('[data-cy="username-error-label"]')
        .should("be.visible")
        .and("have.text", "A username is required.")

      // 6. Type shortUsername in username input
      cy.get('[data-cy="username"]').type(shortUsername)

      // 7. Check username input displays error label with text 'Username must be at least 6 characters.'
      cy.get('[data-cy="username-error-label"]')
        .should("be.visible")
        .and("have.text", "Username must be at least 6 characters.")

      // 8. Type longUsername in username input
      cy.get('[data-cy="username"]').clear().type(longUsername)

      // 9. Check username input displays error label with text 'Username must be shorter than 20 characters.'
      cy.get('[data-cy="username-error-label"]')
        .should("be.visible")
        .and("have.text", "Username must be shorter than 20 characters.")

      // -- EMAIL --
      // 10. Check email input displays error label with text 'An email address is required.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "An email address is required.")

      // 11. Type invalidEmail in email input
      cy.get('[data-cy="email"]').type(invalidEmail)

      // 12. Check email input displays error label with text 'Email must be valid.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be valid.")

      // 13. Type shortEmail in email input
      cy.get('[data-cy="email"]').clear().type(shortEmail)

      // 14. Check email input displays error label with text 'Email must be at least 6 characters.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be at least 6 characters.")

      // 15. Type longEmail in email input
      cy.get('[data-cy="email"]').clear().type(longEmail)

      // 16. Check email input displays error label with text 'Email must be shorter than 255 characters.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be shorter than 255 characters.")

      // -- PASSWORD --
      // 17. Check password input displays error label with text 'A password is required.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "A password is required.")

      // 18. Type shortPassword in password input
      cy.get('[data-cy="password"]').type(shortPassword)

      // 19. Check password input displays error label with text 'Password must be at least 8 characters.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "Password must be at least 8 characters.")

      // 20. Type noUppercasePassword in password input
      cy.get('[data-cy="password"]').clear().type(noUppercasePassword)

      // 21. Check password input displays error label with text 'Password must contain at least 1 uppercase character.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and(
          "have.text",
          "Password must contain at least 1 uppercase character."
        )

      // 22. Type noLowercasePassword in password input
      cy.get('[data-cy="password"]').clear().type(noLowercasePassword)

      // 23. Check password input displays error label with text 'Password must contain at least 1 lowercase character.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and(
          "have.text",
          "Password must contain at least 1 lowercase character."
        )

      // 24. Type noNumberPassword in password input
      cy.get('[data-cy="password"]').clear().type(noNumberPassword)

      // 25. Check password input displays error label with text 'Password must contain at least 1 number character.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "Password must contain at least 1 number character.")

      // 26. Type noSpecialCharacterPassword in password input
      cy.get('[data-cy="password"]').clear().type(noSpecialCharacterPassword)

      // 27. Check password input displays error label with text 'Password must contain at least 1 special character.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "Password must contain at least 1 special character.")

      // -- PASSWORD CONFIRMATION --
      // 28. Check password confirmation input displays error label with text 'A password confirmation is required.'
      cy.get('[data-cy="password-confirmation-error-label"]')
        .should("be.visible")
        .and("have.text", "A password confirmation is required.")

      // 29. Type incorrectPasswordConfirmation in password confirmation input
      cy.get('[data-cy="password-confirmation"]').type("incorrect")

      // 30. Check password confirmation input displays error label with text 'Passwords do not match.'
      cy.get('[data-cy="password-confirmation-error-label"]')
        .should("be.visible")
        .and("have.text", "Passwords do not match.")

      // 31. Type username on username input
      cy.get('[data-cy="username"]').clear().type(username)

      // 32. Type email on email input
      cy.get('[data-cy="email"]').clear().type(email)

      // 33. Type password on password input
      cy.get('[data-cy="password"]').clear().type(password)

      // 34. Type password confirmation on password confirmation input
      cy.get('[data-cy="password-confirmation"]')
        .clear()
        .type(passwordConfirmation)

      // 35. Click 'REGISTER' button
      cy.contains("REGISTER").click()

      // 36. Check register success message with text 'User testuser1@gmail.com successfully registered!' is visible
      cy.getBySel("form-action-success")
        .should("be.visible")
        .and("contain.text", `User ${email} successfully registered!`)

      // 37. Check app redirects to http://localhost:3000/account/login
      cy.url().should("include", "/account/login")

      // 38. Click on 'LOGIN' button
      cy.contains("LOGIN").click()

      // -- LOGIN VALIDATION --

      // -- EMAIL --
      // 39. Check email input displays error label with text 'An email address is required.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "An email address is required.")

      // 40. Type invalidEmail in email input
      cy.get('[data-cy="email"]').type(invalidEmail)

      // 41. Check email input displays error label with text 'Email must be valid.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be valid.")

      // 42. Type shortEmail in email input
      cy.get('[data-cy="email"]').clear().type(shortEmail)

      // 43. Check email input displays error label with text 'Email must be at least 6 characters.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be at least 6 characters.")

      // 44. Type longEmail in email input
      cy.get('[data-cy="email"]').clear().type(longEmail)

      // 45. Check email input displays error label with text 'Email must be shorter than 255 characters.'
      cy.get('[data-cy="email-error-label"]')
        .should("be.visible")
        .and("have.text", "Email must be shorter than 255 characters.")

      // -- PASSWORD --
      // 46. Check password input displays error label with text 'A password is required.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "A password is required.")

      // 47. Type shortPassword in password input
      cy.get('[data-cy="password"]').type(shortPassword)

      // 48. Check password input displays error label with text 'Password must be at least 8 characters.'
      cy.get('[data-cy="password-error-label"]')
        .should("be.visible")
        .and("have.text", "Password must be at least 8 characters.")

      // 57. Type email on email input
      cy.get('[data-cy="email"]').clear().type(email)

      // 58. Type password on password input
      cy.get('[data-cy="password"]').clear().type(password)

      // 59. Click 'LOGIN' button
      cy.contains("LOGIN").click()

      // 60. Check login success message with text 'Login successful!' is visible
      cy.contains("Login successful!").should("be.visible")

      // 61. Check there are no todos created
      cy.get('[data-test="todo-item"]').should("not.exist")

      // 62. Check the text 'No todos added yet...' is displayed
      cy.contains("No todos added yet...").should("be.visible")

      // 63. Click on 'Add Todo' button
      cy.contains("Add Todo").click()

      // -- ADD TODO --
      // 64. Check todo input displays error label with text 'Todo is required.'
      cy.get('[data-cy="input-error-label"]')
        .should("be.visible")
        .and("have.text", "Todo is required.")

      // 65. Type shortTodoDescription on todo input
      cy.get('[data-cy="todo-input"]').type(shortTodoDescription)

      // 66. Check todo input displays error label with text 'Todos must be at least 3 characters.'
      cy.get('[data-cy="input-error-label"]')
        .should("be.visible")
        .and("have.text", "Todos must be at least 3 characters.")

      // 67. Type longTodoDescription on todo input
      cy.get('[data-cy="todo-input"]').clear().type(longDescription)

      // 68. Check todo input displays error label with text 'Todos cannot contain more than 40 characters.'
      cy.get('[data-cy="input-error-label"]')
        .should("be.visible")
        .and("have.text", "Todos cannot contain more than 40 characters.")

      // 69. Type todoDescription in todo input
      cy.get('[data-cy="todo-input"]').clear().type(todoDescription)

      // 70. Click 'Add Todo' button
      cy.contains("Add Todo").click()

      // 71. Check the text 'No todos added yet...' is not visible
      cy.contains("No todos added yet...").should("not.exist")

      // 72. Check the tabs Uncompleted, Completed and All are visible
      cy.contains("Uncompleted").should("be.visible")
      cy.contains("Completed").should("be.visible")
      cy.contains("All").should("be.visible")

      // 73. Check the newly added todo is visible
      cy.get('[data-cy="todo-item"]')
        .should("be.visible")
        .and("contain", todoDescription)

      // 74. Click on todo description text for it to convert into an input
      cy.get('[data-cy="todos-description-container"]').click()

      // -- EDIT TODO --

      // 75. Delete todo description text
      cy.getBySel("todos-text-input").clear()

      // 76. Type shortTodoDescription text into todo input
      cy.getBySel("todos-text-input").type(`${shortTodoDescription}`)

      // 77. Press ENTER key
      cy.getBySel("todos-text-input").type("{enter}")

      // 78. Check todo edit input displays error label with text 'Todos must be at least 3 characters.'
      cy.get('[data-cy="todo-error-label"]')
        .should("be.visible")
        .and("have.text", "Todos must be at least 3 characters.")

      // 79. Type longTodoDescription text into todo input
      cy.getBySel("todos-text-input").clear().type(longDescription)

      // 80. Press ENTER key
      cy.getBySel("todos-text-input").type("{enter}")

      // 81. Check todo edit input displays error label with text 'Todos cannot contain more than 40 characters.'
      cy.get('[data-cy="todo-error-label"]')
        .should("be.visible")
        .and("have.text", "Todos cannot contain more than 40 characters.")

      // 82. Type updatedTodoDescription text into todo input
      cy.getBySel("todos-text-input").clear().type(updatedTodoDescription)

      // 83. Press ENTER key
      cy.getBySel("todos-text-input").type("{enter}")

      // 84. Check that todo now displays the updated description text
      cy.get('[data-cy="todo-item"]')
        .should("be.visible")
        .and("contain", updatedTodoDescription)

      // 85. Reload the page
      cy.reload()

      // 86. Check that todo is displayed and displays the updated description text
      cy.get('[data-cy="todo-item"]')
        .should("be.visible")
        .and("contain", updatedTodoDescription)
    })
  )
})
