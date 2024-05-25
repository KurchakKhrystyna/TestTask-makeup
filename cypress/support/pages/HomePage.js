class HomePage {
    visit() {
      cy.visit('/');
    }
  
    verifyUrl() {
      cy.url().should('eq', Cypress.config().baseUrl);
    }
  
    openCategoryMenu() {
      cy.get('.menu-button').click();
    }
  
    searchItem(itemName) {
      cy.get('div.search-button').click();
      cy.get('#search-input').type(`${itemName}{enter}`);
    }
  }
  
  export default HomePage;
  