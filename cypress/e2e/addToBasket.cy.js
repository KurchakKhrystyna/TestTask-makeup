import HomePage from '../support/pages/HomePage';
import CategoryPage from '../support/pages/CategoryPage';
import ProductPage from '../support/pages/ProductPage';
import BasketPage from '../support/pages/BasketPage';

describe('Add items to the basket', () => {
  const productName1 = 'Однофазні рідкі кристали';
  const productName2 = 'Eveline Cosmetics Variete Lashes Show Full Volume Ultra-Length Mascara';

  const categoryIndex1 = 5;
  const categoryIndex2 = 4;
  const productVariantId1 = '1172299';
  const productVariantId2 = '1804152';

  const homePage = new HomePage();
  const categoryPage = new CategoryPage();
  const productPage = new ProductPage();
  const basketPage = new BasketPage();

  it('should add items to the basket and verify the price calculation', () => {
    homePage.visit();
    homePage.verifyUrl();
    homePage.openCategoryMenu();

    categoryPage.selectCategory(categoryIndex1);
    categoryPage.verifyUrlContains('category');
    categoryPage.scrollToProductSection();

    productPage.selectProduct(productVariantId1);
    productPage.addToBasket();
    productPage.verifyBasketPageDisplayed();
    productPage.closePopup();
    productPage.goBack();

    homePage.openCategoryMenu();
    categoryPage.selectCategory(categoryIndex2);
    categoryPage.verifyUrlContains('category');
    categoryPage.scrollToProductSection();
    productPage.selectProduct(productVariantId2);
    productPage.addToBasket();
    productPage.verifyBasketPageDisplayed();

    basketPage.showAllCartItems();
    basketPage.verifyProductsInBasket(productName1, productName2);

    basketPage.getProductPrice('40445_1172299').then(price1 => {
      basketPage.getProductPrice('803043_1804152').then(price2 => {
        const totalPrice = (price1 + price2).toFixed(2);
        basketPage.verifyTotalPrice(totalPrice);
      });
    });

    basketPage.verifyRemoveButtonVisible();
  });
});
