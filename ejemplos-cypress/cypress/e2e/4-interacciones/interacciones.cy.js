/// <reference types="cypress" />

describe('Interacciones con elementos', () => {

  describe('Localhost 8080', () => {
    beforeEach(() => {
      cy.visit('http://localhost:8080')
    });

    xit('Al hacer doble click debería cambiar el color de fondo', () => {
      cy.get('[data-cy="caja-dblclick"]')
        .dblclick()
        .should('have.css', 'background-color', 'rgb(255, 255, 0)')
        .and('have.class', 'db-clicked')

    });

    it('Debería quedarse marcado series, cine y musica', () => {
      const arrOptions = ['series', 'cine', 'musica']
      cy.get('[data-cy="hobbies"] input[type="checkbox"]')
        .check(arrOptions)
        .each((elemCheckbox, index) => {
          console.log({ elemNum: index })
          expect(arrOptions).to.be.include(elemCheckbox.val())
        })

      cy.get('[data-cy="hobbies"] input[type="checkbox"]')
        .uncheck('tenis')

      cy.get('input#hobby4')
        // .should('have.attr', 'checked', false) // Este para atributos de string
        // .should('have.prop', 'checked', false)
        .should('not.be.checked')

    })

    xit('Se selecciona un solo elemento', () => {
      cy.get('[data-cy="selector-coches"]')
        .should('have.value', 'polestar-2')
        .select('Xpeng P7')
        .should('have.value', 'xpeng-p7')
        .select('nio-et7')
        .should('have.value', 'nio-et7')
      // .select('xpeng-p7')

      cy.get('[data-cy="selector-coches"] option:selected')
        .should('have.text', 'Nio eT7')
    });

    xit('Se seleccionan varias opciones', () => {
      cy.get('[data-cy="selector-coches-multiple"]')
        .select(['Xpeng P7', 'Tesla Model 3'])
        .invoke('val')
        .should('have.members', ['xpeng-p7', 'tesla-model-3'])

    });

    xit('Debería de existir la cookie miCookie', () => {

      cy.getCookie('miCookie')
        .should('have.a.property', 'value', 'Cookies, cookies...')

      cy.setCookie('cookie-personalizada', 'que cookie')

      cy.getCookies()
        .should('have.length', 2)

      cy.clearCookies()

      cy.setCookie('cookie-personalizada', 'que cookie')

      cy.getCookies()
        .should('have.length', 1)
    })

    xit('Debería mostrar un alert con el texto Hola mundo!!!', () => {

      cy.get('[data-cy="btn-alert"]')
        .click()

      cy.on('window:alert', (texto) => {
        expect(texto).to.be.equal('Hola mundo!!!')
      })

    });

    xit('Debería quitar el mensaje al confirmar', () => {

      cy.get('[data-cy="btn-confirm"]')
        .click()

      cy.on('window:confirm', () => true)

      cy.get('[data-cy="confirm-nombre"]')
        .should('be.empty')
      // .invoke('text')
      // .should('equal', '')
    });

    it('Debería mostrar el nombre que se escribe en el prompt', () => {
      const nombre = 'Mike'
      cy.window()
        .then((win) => {
          cy.stub(win, 'prompt').returns(nombre)
        })

      cy.get('[data-cy="btn-prompt"]')
        .click()

      cy.get('[data-cy="prompt-nombre"]')
        .should('have.text', nombre)

    });

    it('Debería de sacar un pantallazo de la información, ocultando los datos sensibles', () => {

      cy.get('[data-cy="dashboard-screenshot"]')
        .screenshot('dashboard', {
          blackout: ['#email', '#dni', '#saldo']
        })

    })


  })

  xdescribe('TodoMVC', () => {
    beforeEach(() => {
      cy.visit('https://todomvc.com/examples/javascript-es6/dist/')

      cy.get('.new-todo')
        .type('Tarea 1{enter}')
        .type('Tarea 2{enter}')
        .type('Tarea 3{enter}')
    });

    it('Debería de crear 3 tareas y mostrarse los botones de activas y completadas', () => {
      // cy.get('.new-todo')
      //   .type('Tarea 1{enter}')
      //   .type('Tarea 2{enter}')
      //   .type('Tarea 3{enter}')

      cy.get('.todo-list li')
        .should('have.length', 3)

      cy.get('[href="#/active"]')
        .should('be.visible')
        .and('have.text', 'Active')

      cy.get('[href="#/completed"]')
        .should('be.visible')
        .and('have.text', 'Completed')

      // cy.contains('a', 'Active')
    })

    it('Añadir 3 tareas y marcar 1 como completada', () => {
      // cy.get('.new-todo')
      //   .type('Tarea 1{enter}')
      //   .type('Tarea 2{enter}')
      //   .type('Tarea 3{enter}')

      cy.get('input[type="checkbox"]')
        .last()
        .click()
        .parent()
        .parent()
        .should('have.class', 'completed')
    })

    it('Añadir 3 tareas, completar todas y eliminar las completadas', () => {
      // cy.get('.new-todo')
      //   .type('Tarea 1{enter}')
      //   .type('Tarea 2{enter}')
      //   .type('Tarea 3{enter}')


      // cy.get('input.toggle[type="checkbox"]')
      //   .click({ multiple: true })

      // cy.get('input.toggle-all[type="checkbox"]')
      //   .click()
      cy.get('label.toggle-all-label')
        .click()

      cy.get('.clear-completed')
        .click()

      cy.get('ul.todo-list > li')
        .should('have.length', 0)

    })

  });

  xdescribe('Wikipedia', () => {
    beforeEach(() => {
      cy.visit('https://es.wikipedia.org/wiki/Wikipedia:Portada')
    });

    it('Buscar iron man en la wikipedia', () => {
      const txtBuscar = 'Iron Man'

      cy.get('[name="search"]')
        .type(txtBuscar)

      cy.get('#searchform')
        .submit()

      cy.get('#firstHeading')
        .should('have.text', txtBuscar)
    });

  });

  xdescribe('Drag and Drop', () => {
    beforeEach(() => {
      cy.visit('http://cookbook.seleniumacademy.com/DragDropDemo.html')
    });

    it('Debería poner dropped al soltar el elemento sobre el', () => {

      cy.get('#draggable')
        .trigger('mousedown', { which: 1 })
        .trigger('mousemove', { pageX: 190, pageY: 65 })
        .trigger('mouseup')

      cy.get('#droppable > p')
        .should('have.text', 'Dropped!')

    });
  });

  describe('Fixtures', () => {

    beforeEach(() => {
      cy.visit('http://localhost:8081/login')
    });

    it('Debería de ir a la página de inicio si te logueas con cfalco', () => {

      cy.fixture('datos-usuario.json')
        .then((datos) => {
          // cy.get('#email')
          //   .type(datos.usuarioValido.email)

          // cy.get('#password')
          //   .type(datos.usuarioValido.password)

          // cy.get('form')
          //   .submit()

          cy.login(datos.usuarioValido.email, datos.usuarioValido.password)

          cy.get('[data-cy="titulo1"]')
            .should('have.text', 'Pruebas con Cypress')
        })

    });

    it('Debería de quedarse en la página de login si te logueas con un usuario invalido', () => {

      cy.fixture('datos-usuario.json')
        .then((datos) => {

          cy.login(datos.usuarioInvalido.email, datos.usuarioInvalido.password)

          // cy.get('#email')
          //   .type(datos.usuarioInvalido.email)

          // cy.get('#password')
          //   .type(datos.usuarioInvalido.password)

          // cy.get('form')
          //   .submit()

          cy.get('button')
            .should('have.text', 'Sign In')
        })

    });

  })

});