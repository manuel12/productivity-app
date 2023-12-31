// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("getBySel", (selector) => {
  cy.get(`[data-cy=${selector}]`)
})

Cypress.Commands.add("deleteTestTodos", () => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:4000/api/todos/delete-test-todos/",
  }).then((res) => expect(res.status).to.eq(204))
})

Cypress.Commands.add("deleteTestDailies", () => {
  cy.request({
    method: "DELETE",
    url: "http://localhost:4000/api/dailies/delete-test-dailies/",
  }).then((res) => expect(res.status).to.eq(204))
})
