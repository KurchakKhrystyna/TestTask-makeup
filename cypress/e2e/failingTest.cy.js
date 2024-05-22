
describe('Failing test for adding product to cart from PLP on makeup.ua', () => {
  const randomCategoryIndex = Math.floor(Math.random() * 5) + 2;
  it('should fail after adding a product to the cart', () => {
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl);

    // Open the category menu and select a category
    cy.get('.menu-button').click();
    cy.get(`:nth-child(${randomCategoryIndex}) > .menu-list__link`).click(); // Selecting a random category

    // Verify that the category page is displayed
    cy.url().should('contain', 'category');

    // Scroll to the product section
    cy.scrollTo('center');

    // Select a specific product and add it to the basket
    cy.get('.simple-slider-list__link > .product-icons-wrapper > .to-quick-buy').first().click(); // Select the first product on the PLP

    // Add the product to the basket
    cy.get('.header-basket').click();

    // Verify that the basket page is displayed
    cy.get('.page-header').should('contain', 'Кошик');
  });
});
