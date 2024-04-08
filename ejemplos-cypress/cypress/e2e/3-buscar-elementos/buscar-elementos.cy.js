/// <reference types="cypress" />

describe('Búsqueda de elementos', () => {

  it('Debería de poner Listados en el título', () => {
    cy.visit('http://localhost:8080')

    cy.get('#titulo')
      .should('have.text', 'Listados')
  });

  it('Debería de poner Item 3 en el último li de la lista items', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaItems')
      .find('.li3')
      .should('have.text', 'Item 3')

    cy.get('#listaItems > li.li3')
      .should('have.text', 'Item 3')

    cy.contains('li', 'Item 3')
      .should('have.text', 'Item 3')
  });

  it('Debería de haber 3 elementos li en la lista de cosas', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaCosas li')
      .should('have.length', 3)
  });

  it('Debería de haber 3 elementos li en la lista de items', () => {
    cy.visit('http://localhost:8080')

    cy.get('[data-cy="lista1"] > li')
      .should('have.length', 3)
  });

});