/// <reference types="cypress" />

describe('Navegar por el DOM', () => {

  it('Debería de tener 3 elementos la lista de cosas', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaCosas')
      .children()
      .should('have.length', 3)
  });

  it('Debería de tener poner Cosa 1 en el primer elemento de la lista de cosas', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaCosas')
      .children()
      .first()
      .should('have.text', 'Cosa 1')
  });

  it('Debería de tener poner Cosa 2 en el segundo elemento de la lista de cosas', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaCosas')
      .children()
      .eq(1)
      .should('have.text', 'Cosa 2')
  });

  it('Debería de tener poner Cosa 2 en el segundo elemento de la lista de cosas', () => {
    cy.visit('http://localhost:8080')

    cy.get('#listaItems')
      .children()
      .each((elemLi, index) => {
        const numItem = index + 1
        expect(elemLi.text()).to.be.equal('Item ' + numItem)
      })
  });

});