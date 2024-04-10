/// <reference types="cypress" />

describe('Tests accesibilidad', () => {

  it('a11y', () => {
    cy.visit('http://localhost:8081')
    cy.injectAxe()

    cy.checkA11y()
  })

})