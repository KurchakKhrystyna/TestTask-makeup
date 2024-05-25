class BasketPage {
    verifyProductsInBasket(productName1, productName2) {
      cy.get('.product__header').should('contain', productName1).and('contain', productName2);
    }
  
    getProductPrice(productId) {
      return cy.get(`[data-id="${productId}"] > .product-list_product-item > .product__column > .product__price-column > .product__price`)
        .invoke('text')
        .then(priceText => parseFloat(priceText.replace(/,/g, '').trim()));
    }
  
    verifyTotalPrice(expectedTotalPrice) {
      cy.get('.total > span > strong').invoke('text').then(actualTotalPrice => {
        const formattedActualTotalPrice = parseFloat(actualTotalPrice.replace(/,/g, '').trim()).toFixed(2);
        expect(formattedActualTotalPrice).to.equal(expectedTotalPrice);
      });
    }
  
    showAllCartItems() {
      cy.get('#show-all-cart-items').click();
    }
  
    verifyRemoveButtonVisible() {
      cy.get('.product__button-remove').should('be.visible');
    }
  }
  
  export default BasketPage;
  