import HomePage from '../support/pages/HomePage';
import CategoryPage from '../support/pages/CategoryPage';
import ProductPage from '../support/pages/ProductPage';
import BasketPage from '../support/pages/BasketPage';

describe('Failing Test', () => {
  const productVariantId1 = '1172299';
  const homePage = new HomePage();
  const categoryPage = new CategoryPage();
  const productPage = new ProductPage();
  const basketPage = new BasketPage();

  it('should fail to add a non-existent product to the basket', () => {
    homePage.visit();
    homePage.verifyUrl();
    homePage.openCategoryMenu();

    categoryPage.selectCategory(1);  // Random category for the failing test
    categoryPage.verifyUrlContains('category');
    categoryPage.scrollToProductSection();

    // Attempting to select a non-existent product
    productPage.selectFirstProductOnPageToQuiqBuy();

    productPage.verifyBasketPageDisplayed();
  });
});
