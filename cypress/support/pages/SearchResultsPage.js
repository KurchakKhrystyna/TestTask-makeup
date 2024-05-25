class SearchResultsPage {
    verifySearchResultsContain(itemName) {
        cy.get('.catalog-products > .simple-slider-list')
        .should('contain', itemName);
    }
  }
  
  export default SearchResultsPage;
  