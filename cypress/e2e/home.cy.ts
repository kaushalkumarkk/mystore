describe('Home Page', () => {
  it('should load product listings', () => {
    cy.visit('/');
    cy.contains('Products'); // heading

    // wait until at least one product link is available
    cy.get('a[href^="/product/"]', { timeout: 10000 }).should('exist');
  });

  it('should navigate to product detail page', () => {
    cy.visit('/');

    // wait for product links to load and click the first one
    cy.get('a[href^="/product/"]', { timeout: 10000 }).first().click();

    // assert the new page loads correctly
    cy.url().should('include', '/product/');
    cy.contains('Add to Cart');
  });
});
