export const clearLocalStorage = () => {
  cy.window().then((window) => {
    window.localStorage.clear()
  })
}
