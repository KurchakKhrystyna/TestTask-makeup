import HomePage from '../support/pages/HomePage';
import SearchResultsPage from '../support/pages/SearchResultsPage';

describe('Search item', () => {
  const homePage = new HomePage();
  const searchResultsPage = new SearchResultsPage();
  const searchItemName = 'Однофазні рідкі кристали';

  it('should search for an item and verify results', () => {
    homePage.visit();
    homePage.verifyUrl();

    homePage.searchItem(searchItemName);
    searchResultsPage.verifySearchResultsContain(searchItemName);
  });
});
