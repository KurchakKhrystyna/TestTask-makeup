describe('Verify price filter works correctly', () => {
    const randomCategoryIndex = Math.floor(Math.random() * 6) + 1;
    const randomFilterIndex = Math.floor(Math.random() * 7) + 2;
    let filterValue;
  
    it('should apply price filters and verify results', () => {
      cy.visit('/');
      cy.url().should('eq', Cypress.config().baseUrl);
  
      // Open the category menu
      cy.get('.menu-button').click();
  
      // Select a specific category
      cy.get(`:nth-child(${randomCategoryIndex}) > .menu-list__link`).click();
      cy.url().should('contain', 'category');
  
      // Open the filter section
      cy.get('[data-id="parameters"]').click();
      cy.scrollTo('bottom');
  
      // Apply the price filter
      cy.contains('.catalog-filter-name', 'Вартість').click();
      cy.get(`#catalog-price-dia-_${randomFilterIndex} > label`)
        .click()
        .invoke('text')
        .then((text) => {
          filterValue = text.trim(); // Store the filter value
  
          // Apply the filter
          cy.get('button:contains("Застосувати")').click(); 
          cy.scrollTo('top');
  
          // Construct the expected value based on different conditions
          let expectedValue;
          if (filterValue.includes('Менше')) {
            expectedValue = `price_to=${filterValue.replace('Менше', '').trim().replace('₴', '').trim()}`;
          } else if (filterValue.includes('Більше')) {
            expectedValue = `price_from=${filterValue.replace('Більше', '').trim().replace('₴', '').trim()}`;
          } else if (filterValue.includes('-')) {
            const [from, to] = filterValue.split('-').map(val => val.trim());
            expectedValue = `#price_from=${from}&price_to=${to}`.trim().replace('₴', '').trim();
          } else {
            // Default case if none of the conditions match
            expectedValue = ''; 
          }
  
          // Verify the URL contains the expected filter parameter
          cy.url().should('include', expectedValue);
        });
    });
  });
  