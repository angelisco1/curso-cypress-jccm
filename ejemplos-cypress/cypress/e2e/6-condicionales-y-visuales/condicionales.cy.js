/// <reference types="cypress" />

describe('Tests condicionales', () => {

  it('Debería poder rellenar el campo', () => {
    cy.visit('http://localhost:8081')

    cy.get('#modoEdicion')
      .then(check => {
        if (check.prop('checked')) {
          check.trigger('click')
        }
      })

    const nombre = 'Kozinski'
    cy.get('input[name="nombre"]')
      .type(nombre)
      .should('have.value', nombre)

  })


  it('Debería pintar una caja de color oro de un tamaño fijo', () => {
    cy.visit('http://localhost:8081')

    cy.matchImageSnapshot('caja-oro')
  })

})