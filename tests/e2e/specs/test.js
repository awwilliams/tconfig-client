// https://docs.cypress.io/api/introduction/api.html

describe('TConfig main page', () => {
  it('should load', () => {
    cy.visit('/');
  });
  it('should have a heading "Test Configuration Generator"', () => {
    cy.visit('/');
    cy.contains('h4', 'Test Configuration Generator');
  });
});
