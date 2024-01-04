describe('E2E: homepage', () => {
  beforeEach(() => {
    const baseUrl = 'http://localhost:3000'
    cy.visit(baseUrl)
    cy.get('#header').should('exist')
    cy.get('.product-list-page').should('exist')
    cy.get('.footer').should('exist')
  })

  it('check click on first product', () => {
    cy.get('.product').first().click()
  })

  it('check favorite icon click on first product', () => {
    cy.get('.product .ri-heart-line').first().click()
  })

  it('check add to cart icon click on first product', () => {
    cy.get('.product .add-to-cart').first().click()
  })

  it('check favorite and add to cart icon click on first product', () => {
    cy.get('.product .ri-heart-line').first().click()
    cy.get('.product .add-to-cart').first().click()
  })
})
