/// <reference types="cypress" />

describe('Mocks', () => {
  beforeEach(() => {
    // cy.visit('http://localhost:8081', {
    //   onBeforeLoad: (windowObj) => {
    //     cy.spy(windowObj, 'fetch').as('spyFetch')

    //     cy.stub(windowObj.navigator.geolocation, 'getCurrentPosition')
    //       .callsFake((cb) => {
    //         return cb({
    //           coords: {
    //             latitude: '46.874396',
    //             longitude: '-96.835556'
    //           }
    //         })
    //       }).as('stubFargo')

    //     // cy.stub(windowObj.navigator.geolocation, 'getCurrentPosition')
    //     //   .callsFake((cb) => {
    //     //     return cb({
    //     //       coords: {
    //     //         latitude: '0',
    //     //         longitude: '0'
    //     //       }
    //     //     })
    //     //   }).as('stubCualquiera')

    //   }
    // })
  });

  it('Cuando pedimos la ubicación en la que nos encontramos solo se llama una vez a la función que pinta la información', () => {
    cy.visit('http://localhost:8081', {
      onBeforeLoad: (windowObj) => {
        cy.spy(windowObj, 'fetch').as('spyFetch')
      }
    })

    cy.get('[data-cy="btn-ubicacion"]')
      .click()

    // Es twice porque se hace la petición a la API del weather y a la de get-city
    cy.get('@spyFetch')
      .should('be.calledTwice')
  });

  it('Cuando hacemos que la función que nos devuelve la ubicación nos de las coordenadas de Fargo, la ciudad que se muestra es la misma', () => {
    cy.visit('http://localhost:8081', {
      onBeforeLoad: (windowObj) => {
        cy.stub(windowObj.navigator.geolocation, 'getCurrentPosition')
          .callsFake((cb) => {
            return cb({
              coords: {
                latitude: '46.874396',
                longitude: '-96.835556'
              }
            })
          }).as('stubFargo')
      }
    })
    cy.get('[data-cy="btn-ubicacion"]')
      .click()

    cy.get('#ciudad')
      .should('have.text', 'Fargo')

  });

  it('Cuando hacemos que la función que nos devuelve la ubicación nos de unas coordenadas vacías, la ciudad que se muestra es "Una ciudad cualquiera"', () => {
    cy.visit('http://localhost:8081', {
      onBeforeLoad: (windowObj) => {
        cy.stub(windowObj.navigator.geolocation, 'getCurrentPosition')
          .callsFake((cb) => {
            return cb({
              coords: {
                latitude: '0',
                longitude: '0'
              }
            })
          }).as('stubCualquiera')

      }
    })
    cy.get('[data-cy="btn-ubicacion"]')
      .click()

    cy.get('#ciudad')
      .should('have.text', 'Una ciudad cualquiera...')
  });


  it('Cuando una API del tiempo devuelve el texto soleado, se pinta el emoji del sol en la aplicación', () => {
    cy.intercept('/get-weather', { weather: 'soleado' }).as('respSoleado')
    cy.visit('http://localhost:8081')

    cy.wait('@respSoleado')

    cy.get('#tiempo')
      .should('have.text', '☀️');

  })

  it('Cuando una API del tiempo devuelve el texto nevado, se pinta el emoji de la nube con nieve en la aplicación.', () => {
    cy.intercept('/get-weather', { weather: 'nevado' }).as('respNevado')
    cy.visit('http://localhost:8081')

    cy.wait('@respNevado')

    cy.get('#tiempo')
      .should('have.text', '🌨️');

  })

  it('Debería crear la cuenta atrás con los datos correctos', () => {
    cy.visit('https://resting.onrender.com/')
    const tituloDescanso = 'Café'

    cy.get('.css-qzovtw')
      .type(tituloDescanso)

    cy.get('button.css-j13a3q')
      .first()
      .click()

    cy.get('.css-i0fnhq')
      .click()

    cy.clock()

    cy.get('.css-27m423')
      .should('have.text', tituloDescanso)

    cy.get('.css-6368fc')
      .should('have.text', '05 : 00')

  })


  it('Debería quedarse en 0 la cuenta atrás si pasa el tiempo seleccionado', () => {
    cy.intercept('https://images.unsplash.com/photo-*').as('imagenFondo')

    cy.visit('https://resting.onrender.com/')
    const tituloDescanso = 'Café'

    cy.get('.css-qzovtw')
      .type(tituloDescanso)

    cy.get('button.css-j13a3q')
      .first()
      .click()

    cy.get('.css-i0fnhq')
      .click()

    cy.clock()

    cy.wait('@imagenFondo')

    cy.tick(1000 * 4 * 60)

    cy.get('.css-6368fc')
      .should('have.text', '01 : 00')

    cy.tick(1000 * 1 * 60)

    cy.get('.css-6368fc')
      .should('have.text', '00 : 00')
  })

});