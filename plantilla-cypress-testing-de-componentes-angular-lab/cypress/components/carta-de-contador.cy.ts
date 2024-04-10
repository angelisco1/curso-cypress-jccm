import { CartaDeContadorComponent } from "../../src/app/components/carta-de-contador/carta-de-contador.component";

describe('Componente carta de contador', () => {
  const tituloInicial = 'Partidas ganadas'
  const cuentaInicial = 2

  beforeEach(() => {
    cy.mount(CartaDeContadorComponent, {
      componentProperties: {
        cuentaInicial: cuentaInicial,
        titulo: tituloInicial
      }
    })
  });

  it('Al incrementar la cuenta 1 vez, esta pasa a ser 3', () => {

    cy.get('[data-cy="titulo"]')
      .should('have.text', tituloInicial)

    cy.get('[data-cy="cuenta"]')
      .should('have.text', cuentaInicial)


    cy.get('[data-cy="btn-incrementar"]')
      .click()

    cy.get('[data-cy="cuenta"]')
      .should('have.text', 3)


  });
});