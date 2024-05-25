import HomePage from '../support/pages/HomePage';
import CategoryPage from '../support/pages/CategoryPage';

describe('Verify price filter works correctly', () => {
  const randomCategoryIndex = Math.floor(Math.random() * 6) + 2;
  const randomFilterIndex = Math.floor(Math.random() * 7) + 2;
  let filterValue;
  const homePage = new HomePage();
  const categoryPage = new CategoryPage();

  it('should apply price filters and verify results', () => {
    homePage.visit();
    homePage.verifyUrl();
    homePage.openCategoryMenu();

    categoryPage.selectCategory(randomCategoryIndex);
    categoryPage.verifyUrlContains('category');
    categoryPage.scrollToProductSection();
    categoryPage.openFilterSection();
    cy.scrollTo('bottom');

    categoryPage.applyPriceFilter(randomFilterIndex);
    categoryPage.getFilterValue(randomFilterIndex).then(value => {
      filterValue = value;

      let expectedValue;
      let fromPrice = 0;
      let toPrice = Number.MAX_SAFE_INTEGER;

      if (filterValue.includes('Менше')) {
        toPrice = parseFloat(filterValue.replace('Менше', '').trim().replace('₴', '').trim());
        expectedValue = `price_to=${toPrice}`;
      } else if (filterValue.includes('Більше')) {
        fromPrice = parseFloat(filterValue.replace('Більше', '').trim().replace('₴', '').trim());
        expectedValue = `price_from=${fromPrice}`;
      } else if (filterValue.includes('-')) {
        [fromPrice, toPrice] = filterValue.replace('₴', '').split('-').map(v => parseFloat(v.trim()));
        expectedValue = `price_from=${fromPrice}&price_to=${toPrice}`;
      }

      categoryPage.verifyUrlContainsPriceFilter(expectedValue);
    });
  });
});
