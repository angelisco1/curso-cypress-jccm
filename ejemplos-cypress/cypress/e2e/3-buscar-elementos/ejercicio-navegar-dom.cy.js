/// <reference types="cypress" />

describe('Lab: Navegar por el DOM', () => {

  it('Por separado', () => {
    cy.visit('http://www.w3schools.com/html/html_tables.asp')

    cy.get('#accept-choices')
      .click()

    cy.get('#customers tr')
      .should('have.length', 7)

    cy.get('#customers tr')
      .last()
      .children()
      .should('have.length', 3)


    let numFilasDespuesDeLa5 = 0
    cy.get('#customers tr')
      .each((elemTr, index) => {
        if (index > 4) {
          numFilasDespuesDeLa5 += 1
        }
      })
      .then(() => {
        expect(numFilasDespuesDeLa5).to.be.equal(2)
      })

    cy.get('#customers th, #customers td')
      .each((elemTd) => {
        expect(elemTd.text()).not.to.be.empty
      })
  });

  it('Comprobaciones encadenadas', () => {
    cy.visit('http://www.w3schools.com/html/html_tables.asp')

    cy.get('#accept-choices')
      .click()

    cy.get('#customers tr')
      .should('have.length', 7)
      .last()
      .children()
      .should('have.length', 3)
  });

})