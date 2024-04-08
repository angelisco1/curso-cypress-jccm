/// <reference types="cypress" />

describe('Lab: Navegar por el DOM', () => {

  it('', () => {
    cy.visit('http://www.w3schools.com/html/html_tables.asp')

    cy.get('#accept-choices')
      .click()

    cy.get('#customers tr')
      .should('have.length', 7)

    cy.get('#customers tr')
      .last()
      .children()
      .should('have.length', 3)
  });

})