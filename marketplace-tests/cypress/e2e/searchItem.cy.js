describe('Search for an item', () => {
    const productName = 'Однофазні рідкі кристали';
    it('should search for an item and verify results', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl);

      cy.get('div.search-button').click();
  
      cy.get('#search-input').type(`${productName}{enter}`); 
  
      cy.get('.catalog-products > .simple-slider-list').should('contain', productName); 
  
    });
  });
  