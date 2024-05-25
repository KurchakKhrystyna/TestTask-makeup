class CategoryPage {
  selectCategory(index) {
    cy.get(`:nth-child(${index}) > .menu-list__link`).click({force: true});
  }

  verifyUrlContains(text) {
    cy.url().should('contain', text);
  }

  scrollToProductSection() {
    cy.scrollTo('center');
  }

  openFilterSection() {
    cy.get('[data-id="parameters"]').click();
  }

  applyPriceFilter(filterIndex) {
    cy.contains('.catalog-filter-name', 'Вартість').click();
    cy.get(`#catalog-price-dia-_${filterIndex} > label`).click();
    cy.get('button:contains("Застосувати")').click();
  }

  getFilterValue(filterIndex) {
    return cy.get(`#catalog-price-dia-_${filterIndex} > label`).invoke('text').then(text => text.trim());
  }

  verifyUrlContainsPriceFilter(expectedValue) {
    cy.url().should('include', expectedValue);
  }
}

export default CategoryPage;
