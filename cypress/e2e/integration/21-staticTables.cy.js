describe("Static Tables", () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env("SITE_URL")}/frontend`)
    cy.clickCard("Tables");
  });

  /**
   * TEST CASE 1
   * Verify the headers of the table
   * Go to https://techglobal-training.com/frontend/
   * Click on the "Tables" card
   * Validate the headers of the table are "Rank", "Company", "Employees", and "Country"
   */
  it("Verify the headers of the table", () => {
    
  });
});