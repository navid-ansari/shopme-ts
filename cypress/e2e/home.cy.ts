describe('E2E: homepage', () => {
  beforeEach(() => {
    cy.visit('localhost:3000')
    cy.get('#header').should('exist')
    cy.get('.productlist-page').should('exist')
    cy.get('.footer').should('exist')
  })

  it('check click on first product', () => {
    cy.get('.content').first().click()
  })

  it('check favorite icon click on first product', () => {
    cy.get('.content .ri-heart-line').first().click()
  })

  it('check add to cart icon click on first product', () => {
    cy.get('.content .add-to-cart').first().click()
  })

  it('check favorite and add to cart icon click on first product', () => {
    cy.get('.content .ri-heart-line').first().click()
    cy.get('.content .add-to-cart').first().click()
  })
})
