class ProductPage {
    selectProduct(variantId) {
      cy.get(`[data-default-variant-id="${variantId}"] > .simple-slider-list__link > .simple-slider-list__image`).click();
    }

    selectFirstProductOnPageToQuiqBuy(){
        cy.get('.simple-slider-list__link > .product-icons-wrapper > .to-quick-buy').first().click();
    }

    addToBasket() {
      cy.contains('.button', 'Купити').click();
    }
  
    verifyBasketPageDisplayed() {
      cy.get('.page-header').should('contain', 'Кошик');
    }
  
    closePopup() {
      cy.get('.popup__window > .popup-close').click();
    }
  
    goBack() {
      cy.get('.bread-crumbs__back').click();
    }
  }
  
  export default ProductPage;
  