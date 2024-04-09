/// <reference types="cypress" />

describe('Lab: click código secreto', () => {

  beforeEach(() => {
    cy.visit('http://localhost:8080')
  });

  it('Si introducimos el código correcto (6710) nos muestra en el display el mensaje "CODE OK"', () => {
    cy.get('[data-cy="tecla6"]')
      .click()
    cy.get('[data-cy="tecla7"]')
      .click()
    cy.get('[data-cy="tecla1"]')
      .click()
    cy.get('[data-cy="tecla0"]')
      .click()

    cy.get('[data-cy="display"]')
      .should('have.text', 'CODE OK')
  });

  it('Si pulsamos números y pulsamos el botón de "CLD" los borra', () => {
    cy.get('[data-cy="tecla6"]')
      .click()
    cy.get('[data-cy="tecla7"]')
      .click()
    cy.get('[data-cy="tecla1"]')
      .click()

    cy.get('[data-cy="teclaClear"]')
      .click()

    cy.get('[data-cy="display"]')
      .should('be.empty')
    // .should('have.text', '')

  });

  it('Si pulsamos números y pulsamos el botón de "DEL", elimina el último número introducido', () => {
    cy.get('[data-cy="tecla6"]')
      .click()
    cy.get('[data-cy="tecla7"]')
      .click()
    cy.get('[data-cy="tecla1"]')
      .click()

    cy.get('[data-cy="teclaDel"]')
      .click()

    cy.get('[data-cy="display"]')
      .should('have.text', '67')

    cy.get('[data-cy="teclaDel"]')
      .click()

    cy.get('[data-cy="display"]')
      .should('have.text', '6')

  });

  it('No deja introducir un código de más de 4 números', () => {
    cy.get('[data-cy="tecla6"]')
      .click()
    cy.get('[data-cy="tecla7"]')
      .click()
    cy.get('[data-cy="tecla1"]')
      .click()
    cy.get('[data-cy="tecla1"]')
      .click()


    cy.get('[data-cy="tecla8"]')
      .click()

    cy.get('[data-cy="display"]')
      .invoke('text')
      .should('have.length', '4')

  });

});