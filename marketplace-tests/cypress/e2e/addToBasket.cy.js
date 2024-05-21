describe('Add items to the basket', () => {
  const productName1 = 'Однофазні рідкі кристали';
  const productName2 = 'Eveline Cosmetics Variete Lashes Show Full Volume Ultra-Length Mascara';

  const categoryIndex1 = 5;
  const categoryIndex2 = 4;
  const productVariantId1 = '1172299';
  const productVariantId2 = '1804152';
  const initialQuantity = 2;
  const increasedQuantity = 2;

  it('should add items to the basket and verify the price calculation', () => {
    // Visit the base URL
    cy.visit('/');
    cy.url().should('eq', Cypress.config().baseUrl);

    // Function to get product price and calculate total price
    const calculateTotalPrice = (productId) => {
      return cy.get(`[data-id="${productId}"] > .product-list_product-item > .product__column > .product__price-column > .product__price`)
        .invoke('text')
        .then((priceText) => {
          const price = parseFloat(priceText.replace(/,/g, '').trim());
          return price;
        });
    };

    // Open the category menu and select the first category
    cy.get('.menu-button').click();
    cy.get(`:nth-child(${categoryIndex1}) > .menu-list__link`).click();
    cy.url().should('contain', 'category');
    cy.scrollTo('center');

    // Add the first product to the basket
    cy.get(`[data-default-variant-id="${productVariantId1}"] > .simple-slider-list__link > .simple-slider-list__image`).click();
    cy.contains('.button', 'Купити').click();
    cy.get('.page-header').should('contain', 'Кошик');
    cy.get('.popup__window > .popup-close').click();
    cy.get('.bread-crumbs__back').click();
    cy.get('.menu-button').click();

    // Open the category menu and select the second category
    cy.get(`:nth-child(${categoryIndex2}) > .menu-list__link`).click();
    cy.url().should('contain', 'category');
    cy.scrollTo('center');

    // Add the second product to the basket
    cy.get(`[data-default-variant-id="${productVariantId2}"] > .simple-slider-list__link > .info-product-wrapper > .simple-slider-list__name`).click();
    cy.url().should('contain', 'product');
    cy.contains('.button', 'Купити').click();
    cy.get('.page-header').should('contain', 'Кошик');
    cy.get('#show-all-cart-items').click();

    // Verify that the cart contains the selected products
    cy.get('.product__header').should('contain', productName1).and('contain', productName2);

    // Get the prices of the items and calculate the total price
    calculateTotalPrice(`40445_${productVariantId1}`).then((price1) => {
      calculateTotalPrice(`803043_${productVariantId2}`).then((price2) => {
        const totalPrice = price1 + price2; // Calculate the total price
        const expectedTotalPrice = totalPrice.toFixed(2); // Format the expected total price

        // Assert that the displayed total price matches the expected total price
        cy.get('.total > span > strong').invoke('text').then((actualTotalPrice) => {
          const formattedActualTotalPrice = parseFloat(actualTotalPrice).toFixed(2);
          expect(formattedActualTotalPrice).to.equal(expectedTotalPrice);
        });
      });
    });

    // Verify that the remove button is visible
    cy.get('.product__button-remove').should('be.visible');
  });
});
